"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSection } from "../utils/Contextboard";

const BackgroundEiffel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile, mediaPaths } = useSection();
  const videoSource = isMobile ? `/videos/mobile/paris/paris_high_mobile.mp4` : "/videos/laptop/paris/paris_high.webm";
  function convertToMp4Path(webmPath: string) {
    const webmToMp4 = webmPath.replace(".webm", ".mp4");
    return webmToMp4;
  }
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Vous pouvez essayer de détecter quand la vidéo est prête à jouer
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  // Et quand elle est mise en pause
  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('play', handleVideoPlay);
      videoElement.addEventListener('pause', handleVideoPause);

      // Auto-play ne fonctionne pas sur tous les appareils iOS en mode d'économie d'énergie,
      // donc nous tentons de jouer la vidéo après un petit délai
      setTimeout(() => {
        videoElement.play().catch(() => {
          // La vidéo n'a pas joué, peut-être à cause du mode d'économie d'énergie
          console.log("La vidéo ne peut pas jouer automatiquement. Elle pourrait être bloquée par le mode économie d'énergie.");
        });
      }, 1000);
    }

    // Nettoyage de l'effet
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handleVideoPlay);
        videoElement.removeEventListener('pause', handleVideoPause);
      }
    };
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-[-1] bg-cover ${isMobile ? `bg-[url('/images/background.png')]` : `bg-[url('/images/background.png')]`}`}
      id="videoContainer"
    >
      {
        !isVideoPlaying &&
        <video
          ref={videoRef}
          src={videoSource}
          playsInline
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover object-center"
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        >
          <source
            src={`${convertToMp4Path(mediaPaths.paris)}`}
            type="video/mp4"
          />
          <source src={`${mediaPaths.paris}`} type="video/webm" />
        </video>
      }
    </div>
  );
};

export default BackgroundEiffel;
