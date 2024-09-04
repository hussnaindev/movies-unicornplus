import HeroSection from "@/components/heroSection/HeroSection";
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
  const trailer = await new MoviesService().fetchTrailer(movieId);
  const streamingPlatforms = await new MoviesService().fetchWatchProviders(movieId);
  console.log("🚀 ~ page ~ streamingPlatforms:", streamingPlatforms?.results.US.rent)

  return (
    <div>
      <HeroSection
        title={movie?.title || ''}
        cast={cast}
        backgroundImage={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        plot={movie?.overview || ''}
        trailer={trailer || ''}
      />
      <StreamingPlatformsSection  platforms={streamingPlatforms?.results.US.buy || []}/>
    </div>
  );
};

export default page;
