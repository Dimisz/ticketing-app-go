package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Dimisz/ticketing-app-go/API/internal/repository"
	"github.com/Dimisz/ticketing-app-go/API/internal/repository/dbrepo"
)

const port = 8080

type application struct {
	DSN          string
	Domain       string
	DB           repository.DatabaseRepo
	auth         Auth
	JwtSecret    string
	JwtIssuer    string
	JwtAudience  string
	CookieDomain string
}

func main() {
	// set application config
	var app application

	// read from command line and set DB params
	dbHost := "localhost"
	dbPort := "5432"
	dbUsername := "postgres"
	dbPassword := "postgres"
	dbName := "movies"
	defaultConnectionString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable timezone=UTC connect_timeout=5", dbHost, dbPort, dbUsername, dbPassword, dbName)

	flag.StringVar(&app.DSN, "dsn", defaultConnectionString, "Postgres connection string")
	flag.StringVar(&app.JwtSecret, "jwt-secret", "very secret", "signing secret key")
	flag.StringVar(&app.JwtIssuer, "jwt-issuer", "example.com", "signing issuer")
	flag.StringVar(&app.JwtAudience, "jwt-audience", "example.com", "signing audience")
	flag.StringVar(&app.CookieDomain, "cookie-domain", "localhost", "cookie domain")
	flag.StringVar(&app.Domain, "domain", "example.com", "domain")
	flag.Parse()

	// connect to the database
	conn, err := app.connectToDB()
	if err != nil {
		log.Fatal(err)
	}
	app.DB = &dbrepo.PostgresDBRepo{DB: conn}
	defer app.DB.Connection().Close()

	app.auth = Auth{
		Issuer:        app.JwtIssuer,
		Audience:      app.JwtAudience,
		SecretKey:     app.JwtSecret,
		TokenExpiry:   time.Minute * 15,
		RefreshExpiry: time.Hour * 24,
		CookiePath:    "/",
		CookieName:    "__Host-refresh_token",
		CookieDomain:  app.CookieDomain,
	}
	// start a web server
	log.Printf("Starting application on port %d\n", port)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())
	if err != nil {
		log.Fatal(err)
	}

}
