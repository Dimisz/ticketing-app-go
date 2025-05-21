package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
)

const PORT = 8080

type application struct {
	Domain string
	DSN    string
	DB     *sql.DB
}

func main() {
	// set application config
	var app application
	app.Domain = "example.com"
	// read from command line
	flag.StringVar(&app.DSN, "dsn", "host=localhost port=5432 user=postgres password=postgres dbname=movies sslmode=disable timezone=UTC connect_timeout=5", "Postgres connection string")
	flag.Parse()
	// connect to the database
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = conn
	defer app.DB.Close()
	// start a web server
	log.Println("starting appliation on port", PORT)

	err = http.ListenAndServe(fmt.Sprintf(":%d", PORT), app.routes())
	if err != nil {
		log.Fatal(err)
	}
}
