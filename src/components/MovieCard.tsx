// components/MovieCard.tsx
"use client"
import React, { useState } from 'react';
import { FaPlay, FaRegHeart } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

interface MovieCardProps {
  title: string;
  backgroundImage: string;
  rating: number;
  id: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, backgroundImage, rating, id }) => {
  const [loading, setLoading] = useState(false);

  const handleCardClick = () => {
    if (!loading) {
      setLoading(true);
      // Simulate navigation delay or loading effect
      setTimeout(() => {
        // Navigate to movie details page
        window.location.href = `/movies/${id}`;
      }, 1000); // Adjust the delay as needed
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const containerWidth = window.innerWidth;

    if (rect.left < containerWidth / 2) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.4) translateX(80px)';
    } else {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.4) translateX(-80px)';
    }
    card.style.zIndex = '10';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateX(0)';
    card.style.zIndex = '1';
  };

  return (
    <div
      className="relative flex-1 bg-cover bg-center transition-transform duration-500 transform group cursor-pointer"
      style={{ 
        backgroundImage: `url('${backgroundImage}')`,
        transform: 'rotateX(0deg) rotateY(0deg) scale(1)', 
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 20px 40px rgba(0, 0, 0, 0.6)',
        transition: 'transform 0.5s, z-index 0.5s',
        zIndex: '1',
      }}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {loading && <LoadingSpinner />}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4">
        {/* Rating and Favorite Icon */}
        <div className="flex items-center space-x-2 absolute top-4 right-4">
          <span className="text-white text-sm font-semibold bg-black bg-opacity-40 px-2 py-2 rounded-full">
            {rating.toFixed(1)}
          </span>
          <button className="bg-black bg-opacity-40 rounded-full p-2 transition-opacity duration-300 hover:bg-opacity-60">
            <FaRegHeart className="text-xl text-white" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-auto" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}>
          {title}
        </h2>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="bg-white bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleCardClick}
          >
            <FaPlay className="text-2xl text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
