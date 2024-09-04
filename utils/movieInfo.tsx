export const extractMovieShortInfo = (movie: any) => ({
    id: movie.id,
    title: movie.title,
    rating: movie.vote_average,
    img: movie?.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` : '',
  })