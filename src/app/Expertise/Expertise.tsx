import { useEffect, useRef, useState } from "react";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import Image from "next/image";

export default function Expertise() {
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante, isMobile, setIsHoveringExpertiseButton } =
    useSection();
  const { data } = useData();
  const conseilRef = useRef(null);
  const contentieuxRef = useRef(null);
  const affairesRef = useRef(null);

  if (!data) {
    return null;
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

  const { title, box_1, box_2, box_3 } = data[langCode].section_3;
  const { title: box_1_title } = box_1;
  const { title: box_2_title } = box_2;
  const { title: box_3_title } = box_3;

  return (
    <div className="relative w-full h-full bg-blanc z-10">
      <div className="relative w-full h-full bg-blanc gap-[4vw] px-[15vw] flex justify-center items-center">
        <div className="absolute top-[20%] text-[30px] sm:text-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light">
          {title}
        </div>
        <div
          className="expertiseWrapper wrapper1 relative w-1/3 h-1/3 overflow-hidden"
          onMouseEnter={() => {
            setIsHoveringExpertiseButton("conseil");
          }}
          onMouseLeave={() => {
            setIsHoveringExpertiseButton("none");
          }}
        >
          <div className="text-wrapper z-10 absolute text-blanc bottom-[20%] w-full -translate-y-1/2">
            <span className="pl-[20%] text-line">VMDL vous conseille</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
          </div>
        </div>
        <div className="expertiseWrapper wrapper2 relative w-1/3 h-1/3 overflow-hidden">
          <div
            className="text-wrapper z-10 absolute text-blanc bottom-[20%] w-full -translate-y-1/2"
            onMouseEnter={() => {
              setIsHoveringExpertiseButton("contentieux");
            }}
            onMouseLeave={() => {
              setIsHoveringExpertiseButton("none");
            }}
          >
            <span className="pl-[20%] text-line">VMDL vous conseille</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
          </div>
        </div>
        <div className="expertiseWrapper wrapper3 relative w-1/3 h-1/3 overflow-hidden">
          <div
            className="text-wrapper z-10 absolute text-blanc bottom-[20%] w-full -translate-y-1/2"
            onMouseEnter={() => {
              setIsHoveringExpertiseButton("affaires");
            }}
            onMouseLeave={() => {
              setIsHoveringExpertiseButton("none");
            }}
          >
            <span className="pl-[20%] text-line">VMDL vous conseille</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
          </div>
        </div>
        <div className="absolute w-full px-[15vw] bottom-[20%]">
          <p className="">Des expertises pointues, une approche transversale</p>
          <div className="border-b border-noir mt-4"></div>
        </div>
      </div>
    </div>
  );
}
