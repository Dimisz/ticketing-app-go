import { useEffect, useState } from 'react';
import { Movie } from '../../models/movie';
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();
  const moviesList: Movie[] = [
    {
      id: 1,
      title: 'Highlander',
      release_date: '1986-03-07',
      runtime: 116,
      mpaa_rating: 'R',
      description: 'Some long description',
    },
    {
      id: 2,
      title: 'Raiders of the Lost Ark',
      release_date: '1981-06-12',
      runtime: 115,
      mpaa_rating: 'PG-13',
      description: 'Some long description',
    },
  ];
  useEffect(() => {
    for (let i = 0; i < moviesList.length; i++) {
      if (moviesList[i].id === Number(id)) {
        setMovie(moviesList[i]);
        break;
      }
    }
  }, [id]);
  if (!movie) {
    return (
      <>
        <div className="text-center">
          <h2>No movies found</h2>
          <hr />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="text-center">
        <h2>Movie: {movie.title}</h2>
        <small>
          <em>
            {movie.release_date}, {movie.runtime} mins, rated:{' '}
            {movie.mpaa_rating}
          </em>
        </small>
        <hr />
        <p>{movie.description}</p>
      </div>
    </>
  );
}
