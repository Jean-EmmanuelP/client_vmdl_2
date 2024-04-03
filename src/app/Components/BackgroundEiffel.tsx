"use client";

import React, { useRef } from "react";
import { useSection } from "../utils/Contextboard";

const BackgroundEiffel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile } = useSection();
  const videoSource = isMobile ? `\videos\mobile\paris\paris_high_mobile.mp4` : "/videos/laptop/paris/paris_high.webm";

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-[-1] bg-cover ${isMobile ? `bg-[url('/images/background.png')]` : `bg-[url('/images/background.png')]`}`}
      id="videoContainer"
    >
      <video
        ref={videoRef}
        src={videoSource}
        playsInline
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default BackgroundEiffel;
