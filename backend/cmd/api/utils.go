package main

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

type JSONResponse struct {
	HasError bool   `json:"has_error"`
	Message  string `json:"message"`
	Data     any    `json:"data,omitempty"`
}

func (app *application) ReadJSON(w http.ResponseWriter, r *http.Request, data any) error {
	maxBytes := 1024 * 1024 // 1MB
	r.Body = http.MaxBytesReader(w, r.Body, int64(maxBytes))

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	err := dec.Decode(data)
	if err != nil {
		return err
	}

	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		return errors.New("body must only contain a single json value")
	}

	return nil
}

func (app *application) WriteJSON(w http.ResponseWriter, statusCode int, data any, headers ...http.Header) error {
	out, err := json.Marshal(data)
	if err != nil {
		return err
	}

	if len(headers) > 0 {
		for key, value := range headers[0] {
			w.Header()[key] = value
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_, err = w.Write(out)
	if err != nil {
		return err
	}

	return nil
}

func (app *application) ErrorJSON(w http.ResponseWriter, err error, status ...int) error {
	statusCode := http.StatusBadRequest
	if len(status) > 0 {
		statusCode = status[0]
	}

	var payload JSONResponse
	payload.HasError = true
	payload.Message = err.Error()

	return app.WriteJSON(w, statusCode, payload)
}
