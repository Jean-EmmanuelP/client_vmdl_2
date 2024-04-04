"use client";

import React, { useRef } from "react";
import { useSection } from "../utils/Contextboard";

const BackgroundEiffel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile, mediaPaths } = useSection();
  const videoSource = isMobile ? `/videos/mobile/paris/paris_high_mobile.mp4` : "/videos/laptop/paris/paris_high.webm";
  function convertToMp4Path(webmPath: string) {
    const webmToMp4 = webmPath.replace(".webm", ".mp4");
    return webmToMp4;
  }
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
      >
        <source
          src={`${convertToMp4Path(mediaPaths.paris)}`}
          type="video/mp4"
        />
        <source src={`${mediaPaths.paris}`} type="video/webm" />
      </video>
    </div>
  );
};

export default BackgroundEiffel;
