"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSection } from "../utils/Contextboard";

const BackgroundEiffel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile, mediaPaths } = useSection();
  const videoSource = isMobile ? `/videos/mobile/paris/paris_high_mobile.mp4` : "/videos/laptop/paris/paris_high.webm";
  const [isPaused, setIsPaused] = useState<boolean>(false);
  function convertToMp4Path(webmPath: string) {
    const webmToMp4 = webmPath.replace(".webm", ".mp4");
    return webmToMp4;
  }

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        setIsPaused(true);
      }
    }, 2000);
  }, [])


  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-[-1] bg-cover ${!isMobile ? `bg-[url('/images/background.webp')]` : `bg-[url('/images/home/pariseiffel.webp')] ${isPaused && 'blur-sm'}`}`}
    >
      {
        (isMobile && isPaused) ?
          (<></>)
          :
          (
            <video
              ref={videoRef}
              src={videoSource}
              playsInline
              autoPlay
              loop
              muted
              className={`${isPaused ? 'hidden' : 'visible'} absolute w-full h-full object-cover object-center`}
            >
              <source
                src={`${convertToMp4Path(mediaPaths.paris)}`}
                type="video/mp4"
              />
              <source src={`${mediaPaths.paris}`} type="video/webm" />
            </video>
          )

      }
    </div>
  );
}
export default BackgroundEiffel;
