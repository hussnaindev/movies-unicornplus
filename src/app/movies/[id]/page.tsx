import HeroSection from "@/components/heroSection/HeroSection";
import MoviesService from "@/services/MoviesService";

const page = async () => {
  const movies = await new MoviesService().fetchPopularMovies();
  const cast = await new MoviesService().fetchMovieCast(movies[1].id);

  return (
    <div>
      <HeroSection
        title={movies[1].title}
        cast={cast}
        backgroundImage={`https://image.tmdb.org/t/p/original/${movies[1]?.backdrop_path}`}
        plot={movies[1].overview}
      />
    </div>
  );
};

export default page;
