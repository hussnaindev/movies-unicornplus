import HeroSection from '@/components/heroSection/HeroSection';
import MoviesList from '@/components/moviesList/MoviesList';
import MovieService from '@/services/MoviesService';
import { moviesWithImages } from '../../../utils/movie';

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function Page({ searchParams }: SearchPageProps) {
  const moviesService = new MovieService();
  const movies = await moviesService.searchMovies(searchParams.q || '');

  const [cast, trailer, moviesList] = await Promise.all([
    moviesService.fetchMovieCast(movies[0].id),
    moviesService.fetchTrailer(movies[0].id),
    moviesWithImages(movies),
  ]);
  
  return (
    <main className="m-0 p-0 box-border">
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
          `}
        </style>
      </head>

      <div className="hero-section">
        <HeroSection
          id={movies[0].id}
          title={movies[0].title}
          backgroundImage={`https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path}`}
          plot={movies[0].overview}
          cast={cast}
          trailer={trailer || ""}
        />
      </div>

      <div className="movies-list">
        <MoviesList movies={moviesList.slice(1)} />
      </div>
    </main>
  );
}
