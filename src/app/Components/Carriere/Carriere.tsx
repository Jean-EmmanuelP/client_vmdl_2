"use client";

import { LangueCode, useSection } from "@/app/utils/Contextboard";
import React, { useEffect, useState } from "react";
import { useData } from "../../utils/DataContext";
import Paragraph from "../Paragraph";
import { divideContentInThree } from "@/app/utils/utils";

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

  const contentParts = divideContentInThree(content);

  return (
    <div className="relative w-full h-full bg-blanc flex flex-col sm:flex-row items-center justify-center">
      <Paragraph>
        <div
          className={`
      text-[30px] sm:text-[40px] uppercase sm:title font-light`}
        >
          {title}
        </div>
        <p
          className={`
        text-[16px] sm:text-[24px] items-center font-light`}
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
  );
}
