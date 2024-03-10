import { useEffect, useMemo, useState } from "react";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import Conseil from "./Conseil";
import Contentieux from "./Contentieux";
import Affaires from "./Affaires";
import TextCycle from "../Components/TextCycle";

export default function Expertise() {
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante, isMobile, setIsHoveringExpertiseButton } =
    useSection();
  const { data } = useData();
  const [isActiveContent, setIsActiveContent] = useState<
    null | "conseil" | "contentieux" | "affaires"
  >(null);
  const [isVisible, setIsVisible] = useState(true);
  function handleClick(
    activeContent: null | "conseil" | "contentieux" | "affaires"
  ) {
    setIsHoveringExpertiseButton("none");

    setIsVisible(false);

    setTimeout(() => {
      setIsActiveContent(activeContent);
      setSubExpertise(activeContent);
    }, 500);
  }
  const memoizedTextCycle = useMemo(() => {
    return (
      <TextCycle
        texts={[
          "Des expertises pointues, une approche transversale",
          "Des visionnaires passionnés, focalisés sur votre réussite",
        ]}
      />
    );
  }, []);
  useEffect(() => {
    console.log(`this is the current value of subExpertise:`, subExpertise);
    subExpertise === null && setIsVisible(true);
  }, [subExpertise]);
  if (!data) {
    return null;
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

  const { title, box_1, box_2, box_3 } = data[langCode].section_3;
  const { title: box_1_title } = box_1;
  const { title: box_2_title } = box_2;
  const { title: box_3_title } = box_3;

  return (
    <div className="relative w-full h-full bg-blanc">
      <div
        className={`relative w-full px-[10%] h-full gap-[4vw] flex justify-center items-center fade-transition ${
          isVisible ? "fade-visible" : "fade-hidden z-0"
        }`}
      >
        <div
          className={`absolute top-[12%] text-[30px] sm:text-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light`}
        >
          {title}
        </div>
        <div
          className="expertiseWrapper wrapper1 relative w-1/3 h-[55%] overflow-hidden"
          onMouseEnter={() => {
            setIsHoveringExpertiseButton("conseil");
          }}
          onMouseLeave={() => {
            setIsHoveringExpertiseButton("none");
          }}
          onClick={() => {
            handleClick("conseil");
          }}
        >
          <div className="absolute top-[10%] left-[20%] text-blanc z-[2001]">
            {box_1_title}
          </div>
          <div className="text-wrapper absolute text-blanc bottom-[20%] w-full -translate-y-1/2">
            <span className="pl-[20%] text-line">VMDL vous conseille</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
          </div>
        </div>
        <div
          className="expertiseWrapper wrapper2 relative w-1/3 h-[55%] overflow-hidden"
          onMouseEnter={() => {
            setIsHoveringExpertiseButton("contentieux");
          }}
          onMouseLeave={() => {
            setIsHoveringExpertiseButton("none");
          }}
          onClick={() => {
            handleClick("contentieux");
          }}
        >
          <div className="absolute top-[10%] left-[20%] text-blanc z-[2001]">
            {box_2_title}
          </div>
          <div className="text-wrapper absolute text-blanc bottom-[20%] w-full -translate-y-1/2">
            <span className="pl-[20%] text-line">VMDL vous conseille</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
          </div>
        </div>
        <div
          className="expertiseWrapper wrapper3 relative w-1/3 h-[55%] overflow-hidden"
          onMouseEnter={() => {
            setIsHoveringExpertiseButton("affaires");
          }}
          onMouseLeave={() => {
            setIsHoveringExpertiseButton("none");
          }}
          onClick={() => {
            handleClick("affaires");
          }}
        >
          <div className="absolute top-[10%] left-[20%] text-blanc z-[2001]">
            {box_3_title}
          </div>

          <div className="text-wrapper absolute text-blanc bottom-[20%] w-full -translate-y-1/2">
            <span className="pl-[20%] text-line">VMDL vous conseille</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
            <span className="pl-[20%] text-line">au jour le jour</span>
          </div>
        </div>
        {/* <div className="absolute w-full px-[14%] bottom-[13%] mb-2">
            {memoizedTextCycle}
            <div className="border-b border-noir"></div>
          </div> */}
      </div>
      <div id="cursor-root"></div>
      <div
        className={`absolute inset-0 w-full h-full fade-transition ${
          !isVisible ? "fade-visible" : "fade-hidden z-0"
        }`}
      >
        {isActiveContent === "conseil" && <Conseil />}
        {isActiveContent === "contentieux" && <Contentieux />}
        {isActiveContent === "affaires" && <Affaires />}
      </div>
    </div>
  );
}
