import { MovieListItem } from "../../types/movies/Movies"
import MoviesList from "./moviesList/MoviesList"

const SimilarMovies = ({movies}: {movies: MovieListItem[]}) => {

  return (
    <div>
      <h2 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }} className='text-2xl font-semibold mb-6 text-center text-white'>Similar Movies</h2>
      <MoviesList movies={movies} />
    </div>
  )
}

export default SimilarMovies
