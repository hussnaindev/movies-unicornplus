import { Actor } from "../actors/Actors";
import { Movie, MovieListItem, TrendingMovie } from "../movies/Movies";

export type HeroSectionProps = {
    title: string;
    backgroundImage: string;
    plot: string
    cast: Actor[],
    id: number,
    trailer: string
    genre?: string; // e.g., "Crime-Drama-Thriller"
    rating?: number; // e.g., 7.8
    language?: string; // e.g., "English"
    releaseDate?: string; // e.g., "2024-03-02"
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

