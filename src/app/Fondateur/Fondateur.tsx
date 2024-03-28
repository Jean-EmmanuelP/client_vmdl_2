import { useEffect, useRef } from "react";
import Paragraph from "../Components/Paragraph";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function Fondateur() {
  const { data } = useData();
  const { langueCourante } = useSection();
  const fondateurRef = useRef<HTMLDivElement>(null);
  const { setBgIsBlackFondateur } = useSection();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setBgIsBlackFondateur(true);
        } else {
          setBgIsBlackFondateur(false);
        }
      });
    }, { threshold: 0.5 })

    if (fondateurRef.current) {
      observer.observe(fondateurRef.current);
    }

    return () => {
      if (fondateurRef.current) {
        observer.unobserve(fondateurRef.current)
      }
    }
  })
  if (!data) {
    return;
  }
  // langCodeMap doubled
  const langCodeMap: { [key in LangueCode]: string } = {
    FR: 'fr',
    EN: 'en',
    IT: 'it',
    ES: 'es',
    عربي: 'عربي',
    PT: 'pt',
    DE: 'de',
    中文: '中文'
  };
  // langCode doubled
  const langCode = langCodeMap[langueCourante as LangueCode] || langCodeMap['FR'];
  const { title, content } = data[langCode].section_5;
  return (
    <section
      ref={fondateurRef}
      id="Fondateur"
      className="relative w-full h-full flex justify-center items-center z-10 bg-noir"
    >
      <Paragraph>
        <span className="uppercase text-[30px] sm:text-[40px] sm:title font-light text-blanc">{title}</span>
        <span className="text-[16px] sm:text-[24px] sm:content leading-[26px] font-light text-left text-blanc">
          {content}
        </span>
      </Paragraph>
    </section>
  );
}
