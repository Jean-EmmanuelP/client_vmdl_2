"use client";

import { LangueCode, useSection } from "@/app/utils/Contextboard";
import { useEffect, useState } from "react";
import { useData } from "../../utils/DataContext";

export default function Carriere() {
  const { loadData, data } = useData();
  const { langueCourante, carriereRef, isMobile } = useSection();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasBeenViewed, setHasBeenViewed] = useState<boolean>(false);
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          if (isMobile) {
            if (!hasBeenViewed && isIntersecting) {
              setIsVisible(isIntersecting);
              setHasBeenViewed(true);
            }
          } else {
            setIsVisible(isIntersecting);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    if (carriereRef.current) {
      observer.observe(carriereRef.current);
    }

    return () => {
      if (carriereRef.current) {
        observer.unobserve(carriereRef.current);
      }
    };
  }, []);
  if (!data) {
    return;
  }
  const langCodeMap: { [key in LangueCode]: string } = {
    FR: "fr",
    EN: "en",
    IT: "it",
    ES: "es",
    عربي: "عربي",
    PT: "pt",
    DE: "de",
    中文: "中文",
  };
  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const { title, content } = data[langCode].carreer;
  function formatContent(content: string) {
    let formatted = content.split('. ').join('.<br><br>');

    // Utiliser une regex pour trouver les deux-points suivis de n'importe quel texte jusqu'à la prochaine balise <br><br> ou la fin de la chaîne
    formatted = formatted.replace(/: (.*?)(<br><br>|$)/g, (match, p1, p2) => {
      return `: <br><br><a href="mailto:cabinet@vmdl.ai" class="underline transition duration-70">${p1.trim()}</a>${p2}`;
    });

    return formatted;
  }
  function createMarkup(formattedContent: string) {
    return { __html: formattedContent };
  }
  const formattedContent = formatContent(content);
  return (
    <div className="relative w-full h-full bg-blanc flex flex-col sm:flex-row items-center justify-center" ref={carriereRef}>
      <div className={`
      ${!isVisible
          ? "opacity-0 translate-y-12 transition duration-700 ease-in-out"
          : "opacity-100 translate-y-0 transition duration-700 ease-in-out"
        }
      absolute top-[15%] sm:top-[18%] text-[30px] sm:text-[40px] uppercase left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light`}>
        {title}
      </div>
      <p
        className={`
        ${!isVisible
            ? "opacity-0 translate-y-12 transition duration-700 delay-100 ease-in-out"
            : "opacity-100 translate-y-0 transition duration-700 delay-100 ease-in-out"
          }
        text-left text-[16px] px-10 sm:px-0 sm:text-[24px] items-center max-w-[790px] font-light`}
        dangerouslySetInnerHTML={createMarkup(formattedContent)}
      ></p>
    </div>
  );
}
