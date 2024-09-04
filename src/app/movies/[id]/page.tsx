import ActorCarousel from "@/components/ActorCarousel";
import HeroSection from "@/components/heroSection/HeroSection";
import MovieReviews from "@/components/MovieReviewsSection";
import StreamingPlatformsSection from "@/components/StreamingPlatforms";
import MoviesService from "@/services/MoviesService";

type PageParams = {
  params: {
    id: string
  },
  searchParams: {}
}

const page = async ({params}: PageParams) => {
  const movieId = Number(params.id);
  const movie = await new MoviesService().fetchMovieDetails(movieId);
  const cast = await new MoviesService().fetchMovieCast(movieId);
  const maleCast = cast.filter(actor => actor.gender == 2)
  const trailer = await new MoviesService().fetchTrailer(movieId);
  const streamingPlatforms = await new MoviesService().fetchWatchProviders(movieId);
  const reviews = await new MoviesService().fetchMovieReviews(movieId);

  return (
    <div>
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
    </div>
  );
};

export default page;
