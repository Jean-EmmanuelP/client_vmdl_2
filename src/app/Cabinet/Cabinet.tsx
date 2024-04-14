import React from "react";
import Paragraph from "../Components/Paragraph";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import { formatContent } from "../utils/utils";

export default function Cabinet() {
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
    data[langCode].section_2;
  return (
    <section
      id="Cabinet"
      className="relative w-full h-full flex items-center justify-center bg-blanc"
    >
      <Paragraph>
        <span className="uppercase text-[30px] sm:text-[40px] sm:title font-light">
          {title}
        </span>
        <span className="text-[12px] sm:text-[24px] sm:content leading-[26px] font-light">
          {formatContent(content)}
        </span>
        <span className="text-[12px] sm:text-base">{button}</span>
        <span className="preserve-spaces text-[12px] sm:text-[24px] sm:content leading-[26px] font-light">
          {formatContent(content_after_clicking_button)}
        </span>
      </Paragraph>
    </section>
  );
}
