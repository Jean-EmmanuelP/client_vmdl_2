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
  // langCodeMap doubled
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
  // langCode doubled
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
        textColor="#FFFFFF"
        bgColor="#00000000"
        className="gap-2.5 w-[70%] sm:w-[50%] h-[30%] text-center z-10 mt-[60px]"
        classTitle="sm:text-[40px] font-medium text-3xl"
        classText="uppercase text-[26px] font-light"
      >
        <span className="">{title}</span>
        <span>{subtitle}</span>
        <span className="text-[12px] sm:text-base">{contact_button}</span>
      </Paragraph>
    </section>
  );
}
