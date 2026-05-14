"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticlesHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] ${
        scrolled
          ? "bg-blanc/95 backdrop-blur-md border-b border-noir/10"
          : "bg-blanc/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Retour à l'accueil VMDL"
          className="flex items-center hover:opacity-70 transition-opacity duration-300 ease-[cubic-bezier(0.44,0,0.56,1)]"
        >
          <img
            src="/images/vmdl-logo.png"
            alt="VMDL"
            className="h-10 sm:h-12 w-auto"
            style={{ filter: "invert(1) brightness(0)" }}
          />
        </Link>
        <Link
          href="/"
          className="uppercase text-[11px] tracking-[0.3em] text-noir/60 hover:text-noir transition"
        >
          ← Retour au site
        </Link>
      </div>
    </header>
  );
}
