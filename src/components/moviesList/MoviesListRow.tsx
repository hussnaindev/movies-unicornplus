"use client";
import React from "react";
import { MoviesListRowProps } from "../../../types/props/Props";
import MovieCard from "../MovieCard";

const MoviesListRow: React.FC<MoviesListRowProps> = React.memo(({ movies, slideDirection = 'left' }) => {
  return (
    // <motion.div
    //   className="flex scrollbar-hidden"
    //   style={{ height: 400 }} // Hint to the browser for optimization
    //   initial={{ opacity: 0, x: slideDirection === 'left' ? -500 : 500 }} // Initial state
    //   whileInView={{ opacity: 1, x: 0 }} // When in view
    //   exit={{ opacity: 0, x: slideDirection === 'left' ? -500 : 500 }} // When out of view
    //   transition={{ duration: 0.5 }}
    // >
    <div style={{height: 400, display: 'flex'}}>
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
    // </motion.div>
  );
});

export default MoviesListRow;
