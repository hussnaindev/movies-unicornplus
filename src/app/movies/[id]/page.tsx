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

const page = async ({ params }: PageParams) => {
  const moviesService = new MoviesService();
  const movieId = Number(params.id);

  // Use Promise.all to fetch all data concurrently
  const [
    movie,
    cast,
    trailer,
    streamingPlatforms,
    reviews,
    similarMovies
  ] = await Promise.all([
    moviesService.fetchMovieDetails(movieId),
    moviesService.fetchMovieCast(movieId),
    moviesService.fetchTrailer(movieId),
    moviesService.fetchWatchProviders(movieId),
    moviesService.fetchMovieReviews(movieId),
    moviesService.fetchSimilarMovies(movieId)
  ]);

  const maleCast = cast.filter(actor => actor.gender === 2);
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
      {streamingPlatforms?.results.US && <StreamingPlatformsSection platforms={streamingPlatforms?.results.US.buy || []} />}
      <ActorCarousel actors={maleCast} />
      <MovieReviews reviews={reviews} />
      <SimilarMovies movies={moviesWithImages} />
    </main>
  );
};

export default page;
