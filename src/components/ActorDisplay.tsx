"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Actor } from '../../types/actors/Actors';

const ActorDisplay = ({ cast }: { cast: Actor[] }) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % cast.length); // Move to the next set of 3
    }, 3000); // Change actors every 3 seconds

    return () => clearInterval(interval);
  }, [cast.length]);

  // Function to get a slice of actors for the current display
  const getVisibleActors = (start: number) => {
    // Slice the array to get the next 3 actors
    return cast.slice(start, start + 3);
  };

  const visibleActors = getVisibleActors(startIndex);

  return (
    <div className="relative flex items-center m-2 pb-2 w-96 h-20 bg-black bg-opacity-50 rounded-lg z-10 overflow-hidden">
      {/* Previous Actor Set */}
      <motion.div
        key={startIndex - 3} // Key based on previous set index
        className="absolute flex items-center w-full h-full"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -20 }} // Slide up and fade out
        exit={{ opacity: 0, y: -20 }} // Ensure the exiting animation
        transition={{ duration: 0.5 }}
        style={{ 
          display: 'flex', 
          width: '100%', 
          height: '100%', 
          justifyContent: 'space-between'
        }}
      >
        {getVisibleActors(startIndex - 3).map((actor) => (
          <div key={actor.id} className="relative" style={{ width: '33%' }}>
            <img
              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
              alt={actor.name}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </motion.div>

      {/* Current Actor Set */}
      <motion.div
        key={startIndex} // Key based on current set index
        className="absolute flex items-center w-full h-full"
        initial={{ opacity: 0, y: 20 }} // Start from below
        animate={{ opacity: 1, y: 0 }} // Slide in and fade in
        exit={{ opacity: 0, y: 20 }} // Slide out if needed
        transition={{ duration: 0.5 }}
        style={{ 
          display: 'flex', 
          width: '100%', 
          height: '100%', 
          justifyContent: 'space-between'
        }}
      >
        {visibleActors.map((actor) => (
          <div key={actor.id} className="relative" style={{ width: '33%' }}>
            <img
              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
              alt={actor.name}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ActorDisplay;
