import Paragraph from "../Paragraph";
import { LangueCode, useSection } from "@/app/utils/Contextboard";
import { useData } from "@/app/utils/DataContext";
import { useEffect, useState } from "react";

export default function Honoraires() {
  const { data } = useData();
  const { langueCourante, honoraireRef, isMobile } = useSection();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasBeenViewed, setHasBeenViewed] = useState<boolean>(false);
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

    if (honoraireRef.current) {
      observer.observe(honoraireRef.current);
    }

    return () => {
      if (honoraireRef.current) {
        observer.unobserve(honoraireRef.current);
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
  const { title, content } =
    data[langCode].section_6;
  return (
    <section
      className="relative w-full h-full flex justify-center items-center gap-4  bg-blanc"
      ref={honoraireRef}
    >
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
      >
        {content}
      </p>
    </section>
  );
}
