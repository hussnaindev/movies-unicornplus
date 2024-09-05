"use client";
import { Manrope } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { HeroSectionProps } from "../../../types/props/Props";
import ActorDisplay from "../ActorDisplay";
import SearchBar from "../SearchBar";
const manrope = Manrope({subsets: ['latin']})


const HeroSection = ({ title, backgroundImage, plot, cast, trailer, id, genre, rating, language, releaseDate }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <>
      <Head>
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');`}
          {`@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@200&italic=1&display=swap');`}
        </style>
      </Head>
      <div
        className="relative w-full h-screen bg-cover bg-center transform transition-transform duration-500 group"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: "rotateX(0deg) rotateY(0deg) scale(1.0)",
          transition: "transform 0.5s, box-shadow 0.5s", // Smooth transition
        }}
      >
        {/* Background Video */}
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&loop=1&playlist=${trailer}`} // Replace with your YouTube video ID
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "rotateX(0deg) rotateY(0deg) scale(1.4)",
          }}
        ></iframe>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: 0.5, // 50% opacity
            zIndex: 1, // Ensure overlay is on top of the image but behind the content
          }}
        />

        {/* Overlay and Content */}
        <div
          className="absolute inset-0 left-15 flex flex-col items-start align-bottom justify-end p-8 z-10 transition-transform duration-500 ease-out"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateX(100px) scale(1.1)"; // Move right and scale up on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0px) scale(1.0)"; // Reset on mouse leave
          }}
          style={{maxWidth: '60vw', maxHeight: '50vh', alignSelf: 'end'}}
        >
          <div className="text-white flex items-center gap-4">
            <h1
              className="text-4xl font-bold"
              style={{
                fontFamily: "Montserrat Alternates, sans-serif",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
              }}
            >
              {title}
            </h1>

            <Link href={`/movies/${id}`}>
              <button className="bg-white bg-opacity-20 border-2 border-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-opacity duration-200">
                <FaPlay className="text-2xl text-white" />
              </button>
            </Link>
          </div>
          {cast.length > 0 && <ActorDisplay cast={cast} />} {/* Pass cast data to ActorDisplay */}
                    {/* Movie Details */}
                    <div
            className="text-white mt-4 flex items-center gap-5 text-sm"
            style={{
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontSize: 16,
              textShadow: "0 0 5px rgba(0, 0, 0, 0.8)",
            }}
          >
            <span>{genre} Crime-Drama</span>
            <span>•</span>
            <span>{rating}9.4</span>
            <span>•</span>
            <span>{language} English </span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          {/* Movie Plot */}
          <p
            className={`text-white mt-4 text-lg max-w-2xl ${manrope.className}`}
            style={{
              textShadow: "0 0 5px rgba(0, 0, 0, 0.8)",
              lineHeight: "1.5",
              fontSize: "1.125rem", // 18px, slightly larger than base
            }}
          >
            {plot}
          </p>
        </div>

        {/* Search Form */}
        <div className="absolute z-10 top-7 right-10 transition-transform duration-500 ease-out"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateX(-50px) scale(1.2)"; // Move right and scale up on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0px) scale(1.0)"; // Reset on mouse leave
          }}
        >
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
