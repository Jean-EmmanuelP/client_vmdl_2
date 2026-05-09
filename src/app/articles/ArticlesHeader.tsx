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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-blanc/90 backdrop-blur-sm border-b border-noir/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-[14px] sm:text-[18px] font-light uppercase tracking-[0.15em] hover:opacity-70 transition"
        >
          VMDL
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
