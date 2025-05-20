package main

import (
	"fmt"
	"log"
	"net/http"
)

const PORT = 8080

type application struct {
	Domain string
}

func main() {
	// set application config
	var app application
	app.Domain = "example.com"
	// read from comand line

	// connect to the database

	// start a web server
	log.Println("starting appliation on port", PORT)

	err := http.ListenAndServe(fmt.Sprintf(":%d", PORT), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
