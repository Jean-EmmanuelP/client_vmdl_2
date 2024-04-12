import Paragraph from "../Paragraph";
import { LangueCode, useSection } from "@/app/utils/Contextboard";
import { useData } from "@/app/utils/DataContext";
import { divideContentInThree } from "@/app/utils/utils";
import React from "react";

export default function Honoraires() {
  const { data } = useData();
  const { langueCourante, honoraireRef, isMobile } = useSection();

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
  const { title, content } = data[langCode].section_6;

  const contentParts = divideContentInThree(content);

  return (
    <section className="relative w-full h-full flex justify-center items-center gap-4  bg-blanc">
      <div className="w-full justify-center items-center flex sm:-mt-[64px] overflow-y-scroll sm:overflow-hidden max-h-[80%]">
        <Paragraph>
          <div
            className={`
       text-[30px] sm:text-[40px] uppercase sm:title font-light`}
          >
            {title}
          </div>
          <p
            className={`
        text-[16px] sm:px-0 sm:text-[24px] font-light`}
          >
            {contentParts.map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index !== contentParts.length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
        </Paragraph>
      </div>
    </section>
  );
}
