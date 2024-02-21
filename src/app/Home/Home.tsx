"use client";

import { useEffect, useState } from "react";
import Paragraph from "../Components/Paragraph";
import { useData } from "../utils/DataContext";
import { LangueCode, useSection } from "../utils/Contextboard";
import Toggle from "../assets/svg/Toggle";

export default function Home() {
  const { data } = useData();
  const [languesVisibles, setLanguesVisibles] = useState(false);
  const { langueCourante, setLangueCourante } = useSection();
  const { currentSection } = useSection();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const supportedLangs: LangueCode[] = [
      "FR",
      "EN",
      "IT",
      "ES",
      "عربي",
      "PT",
      "DE",
      "中文",
    ];

    const browserLang = navigator.language.slice(0, 2).toUpperCase();
    const isLangueCode = (lang: any): lang is LangueCode =>
      supportedLangs.includes(lang);

    const appLang = isLangueCode(browserLang) ? browserLang : "FR";

    setLangueCourante(appLang);
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
  const langCode = langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const { title, subtitle, contact_button } = data[langCode].section_1;

  const langues = ["FR", "EN", "IT", "ES", "عربي", "PT", "DE", "中文"];

  const afficherLangues = () => {
    setLanguesVisibles(true);
  };

  const masquerLangues = () => {
    setLanguesVisibles(false);
  };

  const choisirLangue = (nouvelleLangue: any) => {
    setLangueCourante(nouvelleLangue);
    setLanguesVisibles(false);
  };

  return (
    <div
      id="Home"
      className="w-full h-full flex justify-center items-center transparent"
    >
      <Paragraph
        homeSection={true}
        textColor="#FFFFFF"
        bgColor="#00000000"
        className="gap-2.5 w-[70%] sm:w-[50%] h-[30%] text-center z-10 mt-[60px] sm:mt-[-50px]"
        classTitle="sm:text-[40px] font-medium text-3xl"
        classText="uppercase text-[26px] font-light"
      >
        <span className="">{title}</span>
        <span>{subtitle}</span>
        <span className="text-[12px] sm:text-base">{contact_button}</span>
      </Paragraph>
      <div
        className="absolute top-[95px] sm:top-[3%] right-[3%] sm:right-1 flex flex-col items-center w-[100px] h-[55%] font-bold text-gray-800 text-sm sm:text-base"
        onMouseLeave={masquerLangues}
      >
        {/* Langue courante toujours visible */}
        <div
          data-clickable={true}
          className={`transition duration-150 hover:text-lg hover:bg-blanc/70 flex rounded-md justify-center items-center w-[50px] h-[30px] sm:w-[70px] sm:h-[50px] bg-blanc text-noir shadow-md ${currentSection !== 0 && !isMobile && "hidden"
            } flex items-center p-2 sm:p-0`}
          onMouseEnter={afficherLangues}
          onClick={afficherLangues}
        >
          <p className="ml-[.5px] text-[10px] sm:text-base mr-1">
            {langueCourante}
          </p>
          <Toggle isToggled={languesVisibles ? true : false} size={isMobile ? "12px" : "18px"} />
        </div>

        {/* Conteneur pour les autres langues */}
        <div
          className={`flex flex-col items-center transition-all ${!languesVisibles ? "h-0 overflow-hidden" : "h-auto mt-2"
            }`}
        >
          {langues
            .filter((langue) => langue !== langueCourante)
            .map((langue, index) => (
              <div
                data-clickable={true}
                className={`transition duration-150 hover:text-lg text-[12px] sm:text-base rounded-md flex justify-center items-center w-[50px] h-[30px] hover:bg-blanc/70 sm:w-[70px] sm:h-[50px] m-2 bg-blanc text-noir shadow-md ${languesVisibles ? "opacity-100" : ""
                  }`}
                key={langue}
                onClick={() => choisirLangue(langue)}
                style={{
                  transition: `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1
                    }s`,
                  transform: `${languesVisibles ? "translateY(0)" : "translateY(-20px)"
                    }`,
                }}
              >
                {langue}
              </div>
            ))}
        </div>
      </div>
    </div >
  );
}
