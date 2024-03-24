"use client";

import { useEffect } from "react";
import { useData } from "../../utils/DataContext";
import { LangueCode, useSection } from "@/app/utils/Contextboard";

export default function Carriere() {
  const { loadData, data } = useData();
  const { langueCourante } = useSection();
  useEffect(() => {
    loadData();
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
    <div className="relative w-full h-full bg-blanc flex flex-col sm:flex-row items-center justify-center">
      <div className="absolute top-[20%] sm:top-[22%] text-[20px] sm:text-[30px] uppercase left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light">
        {title}
      </div>
      <p
        className="text-left text-[16px] px-10 sm:px-0 sm:text-[24px] items-center -mt-[80px] max-w-[790px] font-light"
        dangerouslySetInnerHTML={createMarkup(formattedContent)}
      ></p>
    </div>
  );
}
