"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSection } from "../utils/Contextboard";

const BackgroundEiffel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isMobile } = useSection();
  const [highSrc, setHighSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Petit fichier chargé immédiatement pour démarrer la vidéo très vite.
  // Sur desktop : ~1.2MB webm (au lieu de 42MB). Sur mobile : ~700KB mp4.
  const lowSrc = isMobile
    ? "/videos/mobile/paris/paris_medium_mobile.mp4"
    : "/videos/laptop/paris/paris_medium.webm";

  // On bascule vers une version plus qualitative seulement après le premier load,
  // et seulement si la connexion le permet.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = navigator as Navigator & {
      connection?: { downlink?: number; saveData?: boolean };
    };
    const downlink = nav.connection?.downlink ?? 10;
    const saveData = nav.connection?.saveData ?? false;

    // Bascule différée pour ne pas concurrencer le load initial.
    const timer = setTimeout(() => {
      if (saveData) return; // l'utilisateur a demandé l'économie de données
      if (isMobile) {
        if (downlink >= 1) {
          setHighSrc("/videos/mobile/paris/paris_high_mobile.mp4");
        }
      } else {
        if (downlink >= 5) {
          setHighSrc("/videos/laptop/paris/paris_high.webm");
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isMobile]);

  // Si la vidéo n'a pas démarré au bout de 3s, on bascule sur l'image fixe (cas connexions très lentes).
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused && !videoReady) {
        setIsPaused(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [videoReady]);

  // Quand la version haute qualité est prête, on remplace la source.
  useEffect(() => {
    if (!highSrc || !videoRef.current) return;
    const video = videoRef.current;
    const previous = video.currentTime;
    video.src = highSrc;
    video.load();
    video.currentTime = previous;
    video.play().catch(() => {});
  }, [highSrc]);

  const posterSrc = isMobile
    ? "/videos/mobile/paris/paris_poster.png"
    : "/images/background.webp";

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-[-1] bg-cover bg-center ${
        !isMobile
          ? `bg-[url('/images/background.webp')]`
          : `bg-[url('/images/home/pariseiffel.webp')] ${isPaused && "blur-sm"}`
      }`}
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {isMobile && isPaused ? null : (
        <video
          ref={videoRef}
          src={lowSrc}
          poster={posterSrc}
          playsInline
          autoPlay
          loop
          muted
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className={`${
            isPaused ? "hidden" : "visible"
          } absolute w-full h-full object-cover object-center transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default BackgroundEiffel;
