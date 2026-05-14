"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Le cabinet", href: "/?section=cabinet" },
  { label: "Expertises", href: "/?section=expertise" },
  { label: "Vision", href: "/?section=vision" },
  { label: "Le fondateur", href: "/?section=fondateur" },
  { label: "Honoraires", href: "/?section=honoraires" },
  { label: "Contact", href: "/?section=contact" },
];

export default function ArticlesHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-700 ease-[cubic-bezier(0.44,0,0.56,1)] text-blanc ${
        scrolled ? "bg-noir/85 backdrop-blur-md" : "bg-noir/60 backdrop-blur-sm"
      }`}
      style={{ height: scrolled ? "64px" : "90px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-[90%] sm:w-[80%] h-full flex items-center justify-between gap-6 sm:gap-12">
          <Link
            href="/"
            aria-label="Retour à l'accueil VMDL"
            className="flex items-center hover:opacity-80 transition-opacity duration-300 ease-[cubic-bezier(0.44,0,0.56,1)]"
          >
            <img
              src="/images/vmdl-logo.png"
              alt="VMDL"
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-9 sm:h-10" : "h-11 sm:h-14"
              }`}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-9 text-[13px] lg:text-[15px] font-medium">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="relative group transition-opacity duration-300 hover:opacity-100 opacity-90"
              >
                <span>{n.label}</span>
                <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-blanc origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.44,0,0.56,1)]" />
              </Link>
            ))}
            <Link
              href="/articles"
              className="relative group text-blanc font-medium"
            >
              <span className="uppercase tracking-wider text-[12px] lg:text-[13px]">
                Articles
              </span>
              <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-blanc" />
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-[13px] uppercase tracking-wider"
            aria-label="Menu"
          >
            {menuOpen ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-noir/95 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.44,0,0.56,1)] overflow-hidden ${
          menuOpen ? "max-h-[600px] py-6" : "max-h-0 py-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-4 px-6">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="text-[14px] uppercase tracking-wider opacity-90 hover:opacity-100"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/articles"
            onClick={() => setMenuOpen(false)}
            className="text-[14px] uppercase tracking-wider border-b border-blanc pb-0.5"
          >
            Articles
          </Link>
        </nav>
      </div>
    </header>
  );
}
