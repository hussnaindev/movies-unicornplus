import { Movie, MovieListItem } from "../types/movies/Movies";
import { extractMovieShortInfo } from "./movieInfo";

export const moviesWithImages = (movies: Movie[]) => {
    const moviesItems: MovieListItem[] = movies.map(extractMovieShortInfo);
    return moviesItems.filter(
      (movie) => movie.img
    );
  }