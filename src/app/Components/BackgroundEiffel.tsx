'use client'

import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';

const BackgroundEiffel: React.FC = () => {
  const [playBackError, setPlaybackError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSource = "/videos/laptop/paris/paris_high.webm";
  const posterPath = "/images/pariseiffel.jpeg";

  useEffect(() => {
    if (videoRef.current) {
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise.catch(() => {
          setPlaybackError(true);
        });
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]" id="videoContainer">
      {playBackError ? (
        <Image
          src={posterPath}
          className="w-full h-full object-cover blur-sm"
          alt="Eiffel Tower"
          layout="fill"
        />
      ) : (
        <video
          ref={videoRef}
          src={videoSource}
          playsInline
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover object-center"
          onError={() => setPlaybackError(true)}
        />
      )}
    </div>
  );
};

export default BackgroundEiffel;
