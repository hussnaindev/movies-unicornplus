// components/MoviesService.ts

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Actor } from '../../types/actors/Actors';
import { Movie } from '../../types/movies/Movies';

interface ActorDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
}

interface TrailerResponse {
  results: Array<{ key: string; site: string; type: string }>;
}

interface PopularPeopleResponse {
  results: Actor[];
}

interface MovieCastResponse {
  cast: Actor[];
}

interface WatchProvidersResponse {
  results: {
    US: {
      buy?: Array<{ provider_id: number; provider_name: string, display_priority: number, logo_path: string }>;
      rent?: Array<{ provider_id: number; provider_name: string, display_priority: number, logo_path: string }>;
      flatrate?: Array<{ provider_id: number; provider_name: string }>;
    };
  };
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number;
}

interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface MovieReviewsResponse {
  results: Review[];
} 

class MoviesService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly axiosInstance: AxiosInstance;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.TMDB_API_KEY || '';
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      params: {
        api_key: this.apiKey,
        language: 'en-US',
      },
    });
  }

  /**
   * Fetch popular movies from TMDb API.
   * @param page The page number to retrieve.
   * @returns A promise that resolves to an array of popular movies.
   */
  public async fetchPopularMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response: AxiosResponse<{ results: Movie[] }> = await this.axiosInstance.get('/movie/popular', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  }

  /**
   * Fetch movie details by ID.
   * @param movieId The ID of the movie to retrieve.
   * @returns A promise that resolves to the movie details.
   */
  public async fetchMovieDetails(movieId: number): Promise<Movie | null> {
    try {
      const response: AxiosResponse<Movie> = await this.axiosInstance.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for movie ID ${movieId}:`, error);
      return null;
    }
  }

  /**
   * Fetch the cast of a movie by ID.
   * @param movieId The ID of the movie to retrieve the cast for.
   * @returns A promise that resolves to an array of actors.
   */
  public async fetchMovieCast(movieId: number): Promise<Actor[]> {
    try {
      const response: AxiosResponse<MovieCastResponse> = await this.axiosInstance.get(`/movie/${movieId}/credits`);
      const castWithImages = response.data.cast.filter(actor => actor.profile_path);
      return castWithImages;
    } catch (error) {
      console.error(`Error fetching cast for movie ID ${movieId}:`, error);
      return [];
    }
  }

    /**
   * Search for movies by a query string.
   * @param query The search query string.
   * @param page The page number to retrieve.
   * @returns A promise that resolves to an array of movies that match the query.
   */
    public async searchMovies(query: string, page: number = 1): Promise<Movie[]> {
      try {
        const response: AxiosResponse<{ results: Movie[] }> = await this.axiosInstance.get('/search/movie', {
          params: { query, page },
        });
        return response.data.results;
      } catch (error) {
        console.error(`Error searching movies with query "${query}":`, error);
        return [];
      }
    }

  /**
   * Fetch details for a specific actor by ID.
   * @param actorId The ID of the actor to retrieve details for.
   * @returns A promise that resolves to the actor's details.
   */
  public async fetchActorDetails(actorId: number): Promise<ActorDetails | null> {
    try {
      const response: AxiosResponse<ActorDetails> = await this.axiosInstance.get(`/person/${actorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for actor ID ${actorId}:`, error);
      return null;
    }
  }

  /**
   * Fetch a list of popular actors.
   * @param page The page number to retrieve.
   * @returns A promise that resolves to an array of actors.
   */
  public async fetchPopularActors(page: number = 1): Promise<Actor[]> {
    try {
      const response: AxiosResponse<PopularPeopleResponse> = await this.axiosInstance.get('/person/popular', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular actors:', error);
      return [];
    }
  }

  /**
   * Fetch the trailer for a movie by ID.
   * @param movieId The ID of the movie to retrieve the trailer for.
   * @returns A promise that resolves to the trailer key if available.
   */
  public async fetchTrailer(movieId: number): Promise<string | null> {
    try {
      const response: AxiosResponse<TrailerResponse> = await this.axiosInstance.get(`/movie/${movieId}/videos`);
      const trailer = response.data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
      return trailer ? trailer.key : null;
    } catch (error) {
      console.error(`Error fetching trailer for movie ID ${movieId}:`, error);
      return null;
    }
  }

  /**
   * Fetch upcoming movies from TMDb API.
   * @param page The page number to retrieve.
   * @returns A promise that resolves to an array of upcoming movies.
   */
  public async fetchUpcomingMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response: AxiosResponse<{ results: Movie[] }> = await this.axiosInstance.get('/movie/upcoming', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      return [];
    }
  }

    /**
   * Fetch watch providers for a specific movie by ID.
   * @param movieId The ID of the movie to retrieve watch providers for.
   * @returns A promise that resolves to the watch providers details.
   */
    public async fetchWatchProviders(movieId: number): Promise<WatchProvidersResponse | null> {
      try {
        const response: AxiosResponse<WatchProvidersResponse> = await this.axiosInstance.get(`/movie/${movieId}/watch/providers`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching watch providers for movie ID ${movieId}:`, error);
        return null;
      }
    }

      /**
   * Fetch reviews for a specific movie by ID.
   * @param movieId The ID of the movie to retrieve reviews for.
   * @returns A promise that resolves to an array of reviews.
   */
  public async fetchMovieReviews(movieId: number): Promise<Review[]> {
    try {
      const response: AxiosResponse<MovieReviewsResponse> = await this.axiosInstance.get(`/movie/${movieId}/reviews`);
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
      return [];
    }
  }

    /**
   * Fetch similar movies for a specific movie by ID.
   * @param movieId The ID of the movie to retrieve similar movies for.
   * @param page The page number to retrieve.
   * @returns A promise that resolves to an array of similar movies.
   */
    public async fetchSimilarMovies(movieId: number, page: number = 1): Promise<Movie[]> {
      try {
        const response: AxiosResponse<{ results: Movie[] }> = await this.axiosInstance.get(`/movie/${movieId}/similar`, {
          params: { page },
        });
        return response.data.results;
      } catch (error) {
        console.error(`Error fetching similar movies for movie ID ${movieId}:`, error);
        return [];
      }
    }
}

export default MoviesService;
