// "use client"
import HeroSection from "@/components/heroSection/HeroSection";
import LatestMovies from "@/components/latestSection/LatestSection";
import TrendingSection from "@/components/trendingSection/TrendingSection";
import MoviesService from "@/services/MoviesService";
import { Actor } from "../../types/actors/Actors";
import { LatestMovie, TrendingMovie } from "../../types/movies/Movies";
import { HomePageProps } from "../../types/props/Props";
import { extractMovieShortInfo } from "../../utils/movieInfo";

const HomePage = async ({ movies }: HomePageProps) => {

  const trendingMovies: TrendingMovie[] = movies.slice(1, 7).map(extractMovieShortInfo);
  const latestMovies: LatestMovie[] = movies.slice(8, 14).map(extractMovieShortInfo);
  const newMovies: LatestMovie[] = movies.slice(14, 20).map(extractMovieShortInfo);
  const cast = await new MoviesService().fetchMovieCast(movies[0].id);
  const actors: Actor[] = await new MoviesService().fetchPopularActors();
  
  return (
      <main>
        <head>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>
        </head>
        <HeroSection
          title={movies[0].title}
          backgroundImage={`https://image.tmdb.org/t/p/original/${movies[0]?.backdrop_path}`}
          plot={movies[0].overview}
          cast={cast}
        />


        <TrendingSection movies={trendingMovies} />

        {/* <HeroSection
          title={movies[7].title}
          backgroundImage={`https://image.tmdb.org/t/p/original/${movies[7]?.backdrop_path}`}
          plot={movies[0].overview}
          cast={cast}
        /> */}
        
        <LatestMovies movies={latestMovies}/>
        <LatestMovies movies={newMovies}/>
        {/* <ActorCarousel actors={actors} /> */}
        {/* <UpcomingMoviesCarousel /> */}
      </main>
  );
};

export default HomePage;
