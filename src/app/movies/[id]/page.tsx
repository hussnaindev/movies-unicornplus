import ActorCarousel from "@/components/ActorCarousel";
import HeroSection from "@/components/heroSection/HeroSection";
import MovieReviews from "@/components/MovieReviewsSection";
import SimilarMovies from "@/components/SimilarMovies";
import StreamingPlatformsSection from "@/components/StreamingPlatforms";
import MoviesService from "@/services/MoviesService";
import { MovieListItem } from "../../../../types/movies/Movies";
import { moviesWithImages } from "../../../../utils/movie";

type PageParams = {
  params: {
    id: string;
  };
  searchParams: {};
};

const page = async ({ params }: PageParams) => {
  const moviesService = new MoviesService();
  const movieId = Number(params.id);

  const [movie, cast, trailer, streamingPlatforms, reviews, similarMovies] =
    await Promise.all([
      moviesService.fetchMovieDetails(movieId),
      moviesService.fetchMovieCast(movieId),
      moviesService.fetchTrailer(movieId),
      moviesService.fetchWatchProviders(movieId),
      moviesService.fetchMovieReviews(movieId),
      moviesService.fetchSimilarMovies(movieId),
    ]);
    
  const maleCast = cast.filter((actor) => actor.gender === 2);
  const moviesList: MovieListItem[] = moviesWithImages(similarMovies);

  return (
    <main>
      <HeroSection
        id={movie?.id || 0}
        title={movie?.title || ""}
        cast={maleCast}
        backgroundImage={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        plot={movie?.overview || ""}
        trailer={trailer || ""}
      />
      {streamingPlatforms?.results.US.buy?.length && (
        <StreamingPlatformsSection
          platforms={streamingPlatforms?.results.US.buy || []}
        />
      )}
      {cast.length && <ActorCarousel actors={maleCast} />}
      {reviews.length >= 1 && <MovieReviews reviews={reviews} />}
      {similarMovies.length && <SimilarMovies movies={moviesList} />}
    </main>
  );
};

export default page;
