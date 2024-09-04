import ActorCarousel from "@/components/ActorCarousel";
import HeroSection from "@/components/heroSection/HeroSection";
import MovieReviews from "@/components/MovieReviewsSection";
import SimilarMovies from "@/components/SimilarMovies";
import StreamingPlatformsSection from "@/components/StreamingPlatforms";
import MoviesService from "@/services/MoviesService";
import { MovieListItem } from "../../../../types/movies/Movies";
import { extractMovieShortInfo } from "../../../../utils/movieInfo";

type PageParams = {
  params: {
    id: string
  },
  searchParams: {}
}

const page = async ({params}: PageParams) => {
  const moviesService = new MoviesService();
  const movieId = Number(params.id);
  const movie = await moviesService.fetchMovieDetails(movieId);
  const cast = await moviesService.fetchMovieCast(movieId);
  const maleCast = cast.filter(actor => actor.gender == 2)
  const trailer = await moviesService.fetchTrailer(movieId);
  const streamingPlatforms = await moviesService.fetchWatchProviders(movieId);
  const reviews = await moviesService.fetchMovieReviews(movieId);
  const similarMovies = await moviesService.fetchSimilarMovies(movieId);
  const moviesItems: MovieListItem[] = similarMovies.map(extractMovieShortInfo);
  const moviesWithImages: MovieListItem[] = moviesItems.filter(movie => movie.img);
  return (
    <main>
      <HeroSection
        title={movie?.title || ''}
        cast={maleCast}
        backgroundImage={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        plot={movie?.overview || ''}
        trailer={trailer || ''}
      />
      <StreamingPlatformsSection  platforms={streamingPlatforms?.results.US.buy || []}/>
      <ActorCarousel actors={maleCast}/>
      <MovieReviews reviews={reviews}/>
      <SimilarMovies movies={moviesWithImages}/>
    </main>
  );
};

export default page;
