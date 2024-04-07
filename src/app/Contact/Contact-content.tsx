import { useEffect, useRef, useState } from "react";
import FormContact from "../Components/Form";
import { useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import Paragraph from "../Components/Paragraph";

export default function ContactContent() {
  const { data } = useData();
  const { langueCourante } = useSection();
  const contactRef = useRef<HTMLDivElement>(null);

  if (!data) {
    return null;
  }

  const langCodeMap = {
    FR: "fr",
    EN: "en",
    IT: "it",
    ES: "es",
    عربي: "عربي",
    PT: "pt",
    DE: "de",
    中文: "中文",
  };

  const langCode = langCodeMap[langueCourante] || langCodeMap["FR"];
  const { title } = data[langCode]?.contact || {};

  if (typeof window !== "undefined") {
    return (
      <div
        ref={contactRef}
        className="w-full h-full flex justify-center items-center bg-[#FAFAFA]"
      >
        <Paragraph>
          <h1
            className={`uppercase text-center py-4 text-[23px] tracking-wide sm:text-[40px] sm:title font-light`}
          >
            {title}
          </h1>
          <div
          >
            <FormContact />
          </div>
        </Paragraph>
      </div>
    );
  }
}
