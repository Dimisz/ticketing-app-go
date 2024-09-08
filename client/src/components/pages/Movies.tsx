import { useEffect, useState } from 'react';
import { Movie } from '../../models/movie';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;
export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      headers: headers,
    };
    fetch(`${apiUrl}/movies`, requestOptions)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);
  const renderedMovies = movies.map((movie) => {
    return (
      <tr key={movie.id}>
        <td>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </td>
        <td>{movie.release_date}</td>
        <td>{movie.mpaa_rating}</td>
      </tr>
    );
  });
  return (
    <>
      <div className="text-center">
        <h2>Movies</h2>
        <hr />
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Release Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{renderedMovies}</tbody>
        </table>
      </div>
    </>
  );
}
