import React from "react";
import { MoviesListRowProps } from "../../../types/props/Props";
import MovieCard from "../MovieCard";

const MoviesListRow: React.FC<MoviesListRowProps> = React.memo(({ movies }) => {
  return (
    <div style={{ height: 400, display: 'flex' }}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          backgroundImage={movie.img}
          rating={movie.rating}
          id={Number(movie.id)}
        />
      ))}
    </div>
  );
});

MoviesListRow.displayName = "MoviesListRow"; // Explicitly set the display name

export default MoviesListRow;
