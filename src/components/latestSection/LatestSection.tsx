"use client"
import { motion } from 'framer-motion';
import { LatestMoviesProps } from "../../../types/props/Props";
import MovieCard from "../MovieCard";

const LatestMovies = ({ movies }: LatestMoviesProps) => {
    return (
        <div>
            {/* First Row */}
            <motion.div
                className="flex scrollbar-hidden"
                style={{ height: 400 }}
                initial={{ opacity: 0, x: -500 }} // Initial state
                whileInView={{ opacity: 1, x: 0 }} // When in view
                exit={{ opacity: 0, x: -500 }} // When out of view
                transition={{ duration: 0.5 }}
            >
                {movies.slice(0, 3).map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        backgroundImage={movie.img}
                        rating={movie.rating}
                    />
                ))}
            </motion.div>

            {/* Second Row */}
            <motion.div
                className="flex scrollbar-hidden"
                style={{ height: 400 }}
                initial={{ opacity: 0, x: 500 }} // Initial state
                whileInView={{ opacity: 1, x: 0 }} // When in view
                exit={{ opacity: 0, x: 500 }} // When out of view
                transition={{ duration: 0.5 }}
            >
                {movies.slice(3, 6).map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        backgroundImage={movie.img}
                        rating={movie.rating}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default LatestMovies;
