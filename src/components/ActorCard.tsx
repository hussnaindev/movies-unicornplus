"use client";
import { ActorCardProps } from "../../types/props/Props";

const ActorCard = ({ name, image }: ActorCardProps) => {
  return (
    <div
      className="relative w-64 bg-cover bg-center transition-transform duration-500 transform group" // Added group class
      style={{ 
        backgroundImage: `url('${image}')`,
        transform: 'rotateX(20deg) rotateY(-20deg) scale(1)', // Initial scale
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.4), 0 20px 40px rgba(0, 0, 0, 0.4)', // Enhanced glow and depth
        transition: 'transform 0.5s, box-shadow 0.5s', // Ensure smooth transition for both transform and box-shadow
        marginLeft: '-15px', // Added negative left margin
        marginTop: '-15px',
        height: 420,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.3)'; // Scaling up on hover
        e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8), 0 30px 60px rgba(0, 0, 0, 0.8)'; // Stronger glow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'rotateX(20deg) rotateY(-20deg) scale(1)'; // Reset scale
        e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.4), 0 20px 40px rgba(0, 0, 0, 0.4)'; // Reset glow
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
        <h3 className="text-white text-lg font-bold" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}>
          {name}
        </h3>
      </div>
    </div>
  );
};

export default ActorCard;
