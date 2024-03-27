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
        <span>{title}</span>
        <span>{subtitle}</span>
        <span>{contact_button}</span>
      </Paragraph>
    </section>
  );
}
