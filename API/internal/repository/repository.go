package repository

import (
	"database/sql"

	"github.com/Dimisz/ticketing-app-go/API/internal/models"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	GetAllMoviesFromDB() ([]*models.Movie, error)
	GetUserByEmail(email string) (*models.User, error)
}
