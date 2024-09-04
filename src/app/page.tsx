import HeroSection from "@/components/heroSection/HeroSection";
import MoviesList from "@/components/moviesList/MoviesList";
import MoviesService from "@/services/MoviesService";
import { MovieListItem } from "../../types/movies/Movies";
import { extractMovieShortInfo } from "../../utils/movieInfo";

export default async function Page() {
  const movies = await new MoviesService().fetchPopularMovies();
  const moviesItems: MovieListItem[] = movies.map(extractMovieShortInfo);
  const moviesWithImages: MovieListItem[] = moviesItems.filter(movie => movie.img);
  const cast = await new MoviesService().fetchMovieCast(movies[0].id);

  return (
    <main style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          `}
        </style>
      </head>
      <div className="hero-section">
        <HeroSection
          title={movies[0].title}
          backgroundImage={`https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path}`}
          plot={movies[0].overview}
          cast={cast}
        />
      </div>
      <div className="movies-list">
        <MoviesList movies={moviesWithImages} />
      </div>
    </main>
  );
}
