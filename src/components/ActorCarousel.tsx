"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Actor } from '../../types/actors/Actors';
import ActorCard from './ActorCard';

const ActorCarousel = ({ actors }: { actors: Actor[] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div>Actors</div>
      <motion.div
        className="flex"
        style={{ height: 400 }}
        animate={isVisible ? { x: ['0%', '-100%'] } : { x: '0%' }} // Continuous scroll
        transition={{ duration: 20, ease: 'linear', repeat: isVisible ? Infinity : 0 }} // Loop if visible
      >
        {actors.concat(actors).map((actor) => ( // Duplicate actors for seamless effect
          <div className="flex-shrink-0 cursor-pointer" key={actor.id}>
            <ActorCard name={actor.name} image={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ActorCarousel;
