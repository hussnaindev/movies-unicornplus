'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { FaPlay, FaRegHeart } from 'react-icons/fa';

interface MovieCardProps {
  title: string;
  backgroundImage: string;
  rating: number;
  id: number
}

const MovieCard: React.FC<MovieCardProps> = ({ title, backgroundImage, rating, id }) => {
  console.log("🚀 ~ backgroundImage:", backgroundImage)
  const cardRef = useRef<HTMLDivElement>(null);
  

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardRef.current) {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const containerWidth = window.innerWidth;

      // Check if the card is on the left or right side
      if (rect.left < containerWidth / 2) {
        // Card is on the left side
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.4) translateX(80px)';
      } else {
        // Card is on the right side
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.4) translateX(-80px)';
      }
      // Increase z-index on hover
      card.style.zIndex = '10';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateX(0)';
      // Reset z-index when not hovered
      cardRef.current.style.zIndex = '1';
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative flex-1 bg-cover bg-center transition-transform duration-500 transform group"
      style={{ 
        backgroundImage: `url('${backgroundImage}')`,
        transform: 'rotateX(0deg) rotateY(0deg) scale(1)', 
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 20px 40px rgba(0, 0, 0, 0.6)',
        transition: 'transform 0.5s, z-index 0.5s', // Ensure smooth transition for z-index
        zIndex: '1', // Default z-index
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
        <Link className="flex justify-center items-center h-full" href={`/movies/${id}`}>
          <button className="bg-white bg-opacity-30 rounded-full w-14 h-14 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaPlay className="text-2xl text-white" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
