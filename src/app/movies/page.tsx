import HeroSection from '@/components/heroSection/HeroSection';
import MoviesList from '@/components/moviesList/MoviesList';
import MovieService from '@/services/MoviesService';
import { MovieListItem } from '../../../types/movies/Movies';
import { extractMovieShortInfo } from '../../../utils/movieInfo';

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function Page({ searchParams }: SearchPageProps) {
  const moviesService = new MovieService();
  const movies = await moviesService.searchMovies(searchParams.q || '');
  const moviesItems: MovieListItem[] = movies.map(extractMovieShortInfo);
  const moviesWithImages: MovieListItem[] = moviesItems.filter(movie => movie.img);
  const cast = await moviesService.fetchMovieCast(movies[0].id);
  const trailer = await moviesService.fetchTrailer(movies[0].id);
  
  return (
    <main>
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        </style>
      </head>
      <HeroSection
        title={movies[0].title}
        backgroundImage={`https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path}`}
        plot={movies[0].overview}
        cast={cast}
        trailer={trailer || ''}
      />
      <MoviesList movies={moviesWithImages} />
    </main>
  );
}
