import HeroSection from "@/components/heroSection/HeroSection";
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

  return (
    <div>
      <HeroSection
        title={movie?.title || ''}
        cast={cast}
        backgroundImage={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        plot={movie?.overview || ''}
        trailer={trailer || ''}
      />
    </div>
  );
};

export default page;
