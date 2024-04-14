import React from "react";
import Paragraph from "../Components/Paragraph";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function Vision() {
  const { data } = useData();
  const { langueCourante } = useSection();
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
  const { title, content, button, content_after_clicking_button } =
    data[langCode].section_4;
  return (
    <section className="w-full h-full flex justify-center relative items-center gap-4 bg-blanc">
      <Paragraph>
        <span className="uppercase text-[30px] sm:text-[40px] font-light">
          {title}
        </span>
        <span className="text-[12px] sm:text-[24px] sm:content font-light leading-4 sm:leading-[26px]">
          {content}
        </span>
        <span className="text-[12px] sm:text-base">{button}</span>
        <span className="text-[12px] sm:text-[24px] sm:content leading-[26px] font-light">
          {content}
        </span>
      </Paragraph>
    </section>
  );
}
