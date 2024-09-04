import MoviesService from '@/services/MoviesService';

const UpcomingMoviesCarousel = async () => {
  const upcomingMovies = await new MoviesService().fetchUpcomingMovies();

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 400 }}>

      <div className="flex items-center">
        {/* Carousel Container */}
        <div className="flex overflow-x-scroll pb-4" style={{ height: 400 }}>
          {upcomingMovies.slice(0, 10).map(movie => (
            <div
              key={movie.id}
              className="relative flex-shrink-0 bg-cover"
              style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`, width: 500 }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2">
                <h2 className="text-white text-sm font-semibold">{movie.title}</h2>
                <p className="text-white text-xs">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMoviesCarousel;
