import { useMemo } from 'react';
import { MoviesListProps } from "../../../types/props/Props";
import { chunkArray } from '../../../utils/array';
import MoviesListRow from './MoviesListRow';

const MoviesList = ({ movies }: MoviesListProps) => {
  // Memoize chunking the movies array into rows of 3
  const threeMoviesinRow = useMemo(() => chunkArray(movies, 3), [movies]);

  // Memoize the moviesListRow array based on threeMoviesinRow
  const moviesListRow = useMemo(
    () => threeMoviesinRow.map((threeMovies, index) => ({
      movies: threeMovies,
      slideDirection: index % 2 === 0 ? 'left' : 'right'
    })),
    [threeMoviesinRow]
  );

  return (
    <div>
      {moviesListRow.map((movieListRow, index) => (
        <MoviesListRow
          key={index} // Provide a key for each row
          movies={movieListRow.movies}
          slideDirection={movieListRow.slideDirection}
        />
      ))}
    </div>
  );
};

export default MoviesList;
