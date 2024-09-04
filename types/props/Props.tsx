import { Actor } from "../actors/Actors";
import { Movie, MovieListItem, TrendingMovie } from "../movies/Movies";

export type HeroSectionProps = {
    title: string;
    backgroundImage: string;
    plot: string
    cast: Actor[],
};

export type TrendingSectionProps = {
    movies: TrendingMovie[];
};

export type LatestMoviesProps = {
    movies: TrendingMovie[];
};

export type HomePageProps = {
    movies: Movie[];
};

export type ActorCardProps = {
    name: string;
    image: string;
}

export type MoviesListProps = {
    movies: MovieListItem[]
}

export type MoviesListRowProps = {
    movies: MovieListItem[],
    slideDirection: string
}

