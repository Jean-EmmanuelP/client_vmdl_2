"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "./LangContext";
import { ARTICLE_LOCALES, getLabels } from "./i18n";

export default function ArticlesHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();
  const t = getLabels(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { label: t.cabinet, href: "/?section=cabinet" },
    { label: t.expertises, href: "/?section=expertise" },
    { label: t.vision, href: "/?section=vision" },
    { label: t.fondateur, href: "/?section=fondateur" },
    { label: t.honoraires, href: "/?section=honoraires" },
    { label: t.contact, href: "/?section=contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-700 ease-[cubic-bezier(0.44,0,0.56,1)] text-blanc ${
        scrolled ? "bg-noir/85 backdrop-blur-md" : "bg-noir/60 backdrop-blur-sm"
      }`}
      style={{ height: scrolled ? "64px" : "90px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-[90%] sm:w-[85%] h-full flex items-center justify-between gap-4 sm:gap-8">
          <Link
            href="/"
            aria-label="Retour à l'accueil VMDL"
            className="flex items-center hover:opacity-80 transition-opacity duration-300 ease-[cubic-bezier(0.44,0,0.56,1)] flex-shrink-0"
          >
            <img
              src="/images/vmdl-logo.png"
              alt="VMDL"
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-9 sm:h-10" : "h-11 sm:h-14"
              }`}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-[13px] lg:text-[14px] font-medium flex-1 justify-center">
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
                {t.articles}
              </span>
              <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-blanc" />
            </Link>
          </nav>

          <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4">
            <div
              className="relative flex flex-col items-center text-xs sm:text-sm"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                aria-label="Changer la langue"
                onClick={() => setLangOpen((v) => !v)}
                onMouseEnter={() => setLangOpen(true)}
                className="relative z-10 text-noir bg-blanc shadow-xl h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center hover:scale-105 transition"
              >
                {lang}
              </button>
              <div
                onMouseEnter={() => setLangOpen(true)}
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 flex flex-col gap-2 transition-all duration-300 ease-[cubic-bezier(0.44,0,0.56,1)] ${
                  langOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {ARTICLE_LOCALES.filter((l) => l !== lang).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className="bg-blanc text-noir hover:scale-110 shadow-xl h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center transition"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-[13px] uppercase tracking-wider"
              aria-label="Menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
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
            {t.articles}
          </Link>
        </nav>
      </div>
    </header>
  );
}
