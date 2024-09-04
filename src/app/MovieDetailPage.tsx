// components/MovieDetailPage.tsx
"use client";

import { FaPlay, FaRegHeart } from 'react-icons/fa';

interface MovieDetailPageProps {
  title: string;
  backgroundImage: string;
  rating: number;
  releaseDate: string;
  description: string;
  // Additional props can be added here
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({ title, backgroundImage, rating, releaseDate, description }) => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-8">
        {/* Title and Details */}
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-white text-lg font-semibold bg-black bg-opacity-40 px-3 py-1 rounded-full">
              {rating.toFixed(1)} {/* Display rating with one decimal place */}
            </span>
            <span className="text-white text-lg font-semibold bg-black bg-opacity-40 px-3 py-1 rounded-full">
              {releaseDate}
            </span>
          </div>
          <p className="text-white text-base mb-4">{description}</p>

          {/* Interactive Buttons */}
          <div className="flex space-x-4 mt-auto">
            <button className="bg-white bg-opacity-30 rounded-full w-16 h-16 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-60">
              <FaPlay className="text-2xl text-white" />
            </button>
            <button className="bg-black bg-opacity-40 rounded-full w-16 h-16 flex items-center justify-center transition-opacity duration-300 hover:bg-opacity-60">
              <FaRegHeart className="text-2xl text-white" />
            </button>
          </div>
        </div>

        {/* Additional Sections (Optional) */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-6">
          {/* Additional movie details like cast, crew, or reviews can go here */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
