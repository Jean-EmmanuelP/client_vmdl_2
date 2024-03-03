"use client";

import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import Back from "../assets/svg/Back";
import Home from "../assets/svg/Home";

interface HeaderProps {
  height: "64px" | "128px" | "90px";
}

export default function Header({ height }: HeaderProps) {
  const { setCurrentSection } = useSection();
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante } = useSection();
  const { loadData, data } = useData();

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
  const { section_1, section_2, section_3, section_4 } = data[langCode].header;

  const handleScroll = (value: number) => {
    const mainDiv = document.getElementById("main");

    if (mainDiv)
      mainDiv.scrollTo({
        top: mainDiv.clientHeight * value,
        behavior: "smooth",
      });
    setCurrentSection(value);
  };

  return (
    <motion.div
      style={{ height }}
      animate={{
        height,
        backgroundColor:
          height === "128px" || height === "90px" ? "#03030300" : "#0303034B",
      }}
      transition={{ duration: 0.6 }}
      className="w-full z-10 text-blanc flex justify-center items-center text-sm md:text-lg gap-28"
    >
      <div
        className={`${
          height === "128px" || height === "90px" ? "border-b" : ""
        } h-full flex justify-center items-center gap-10 md:gap-28`}
      >
        {!subExpertise ? (
          <Fragment>
            <button
              data-clickable="true"
              onClick={() => handleScroll(1)}
              className="hover:scale-105"
            >
              {section_1}
            </button>
            <button
              data-clickable="true"
              onClick={() => handleScroll(2)}
              className="hover:scale-105"
            >
              {section_2}
            </button>
            <button
              data-clickable="true"
              onClick={() => handleScroll(3)}
              className="hover:scale-105"
            >
              {section_3}
            </button>
            <button
              data-clickable="true"
              onClick={() => handleScroll(4)}
              className="hover:scale-105"
            >
              {section_4}
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              data-clickable="true"
              onClick={() => setSubExpertise(null)}
              className="hover:scale-105"
            >
              <Back />
            </button>
            <button
              data-clickable="true"
              onClick={() => {
                handleScroll(0);
                setSubExpertise(null);
              }}
              className="hover:scale-105"
            >
              <Home />
            </button>
          </Fragment>
        )}
      </div>
    </motion.div>
  );
}
