"use client";

import Paragraph from "../Components/Paragraph";
import { useData } from "../utils/DataContext";
import { LangueCode, useSection } from "../utils/Contextboard";

export default function Home() {
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
  const { title, subtitle, contact_button } = data[langCode].section_1;
  return (
    <section
      id="Home"
      className="w-full h-full flex justify-center items-center transparent"
    >
      <Paragraph
        homeSection={true}
      >
        <span className="text-blanc">
          <div className="w-full sm:w-1/4 sm:h-1/3 sm:-translate-y-[10vh] sm:translate-x-[26.5vw]">
            <img src="/images/vmdl-logo.png" />
          </div>
        </span>
        <span className="text-blanc">{subtitle}</span>
        <span>{contact_button}</span>
      </Paragraph>
    </section>
  );
}
