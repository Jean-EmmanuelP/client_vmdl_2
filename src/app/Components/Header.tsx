"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { isMobile } from "react-device-detect";
import { useData } from "../utils/DataContext";
import _ from "lodash";
import Back from "../assets/svg/Back";
import Home from "../assets/svg/Home";
import Menu from "../assets/svg/Menu";

interface HeaderProps {
  height: "64px" | "128px" | "90px";
}

export default function Header({ height }: HeaderProps) {
  const { setCurrentSection } = useSection();
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante } = useSection();
  const { loadData, data } = useData();
  const { menuOpen, goingOut, toggleMenu } = useSection();
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        menuOpen
      ) {
        toggleMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, toggleMenu]);
  const detectScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY !== lastScrollY && menuOpen === true) {
      toggleMenu();
    }
    setLastScrollY(currentScrollY);
  };
  useEffect(() => {
    const handleScrollThrottled = _.throttle(detectScroll, 100);

    window.addEventListener("scroll", handleScrollThrottled);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
    };
  }, [lastScrollY]);

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

  const sectionButtonsVariants = {
    initial: {
      opacity: 0,
      x: -20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.5 },
    },
  };

  const backHomeButtonsVariants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.5 },
    },
  };
  if (typeof window !== "undefined") {
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
            height === "128px" || height === "90px"
              ? "border-b border-slate-50"
              : ""
          } h-full flex justify-center items-center w-[80%] gap-10 md:gap-28`}
        >
          {/* Montrer a Vincent Machado Da Luz et lui demander ce qu'il en pense */}
          {true ? (
            <div className="flex justify-between w-full">
              <button
                onClick={toggleMenu}
                className="uppercase flex justify-center items-center gap-2 z-[20000]"
              >
                <div className="w-4 h-4">
                  <Menu toggleMenu={menuOpen} />
                </div>
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.p
                      key="close"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Close
                    </motion.p>
                  ) : (
                    <motion.p
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Menu
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
              {menuOpen && !isMobile && (
                <div className="overlay" onClick={toggleMenu}></div>
              )}
              <div
                ref={wrapperRef}
                className={`menu ${menuOpen ? "open" : ""} ${
                  goingOut ? "close" : ""
                }`}
              >
                <div className="flex items-end justify-around flex-col w-full h-1/2 absolute top-1/2 right-[2px] -translate-y-1/2">
                  <button
                    data-clickable="true"
                    onClick={() => {
                      toggleMenu();
                      handleScroll(1);
                    }}
                    className="hover:scale-105 pr-16 uppercase"
                  >
                    {section_1}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => {
                      toggleMenu();
                      handleScroll(2);
                    }}
                    className="hover:scale-105 pr-16 uppercase"
                  >
                    {section_2}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => {
                      toggleMenu();
                      handleScroll(3);
                    }}
                    className="hover:scale-105 pr-16 uppercase"
                  >
                    {section_3}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => {
                      toggleMenu();
                      handleScroll(4);
                    }}
                    className="hover:scale-105 pr-16 uppercase"
                  >
                    {section_4}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => {
                      toggleMenu();
                      handleScroll(4);
                    }}
                    className="hover:scale-105 pr-16 uppercase"
                  >
                    {/* TODO */}
                    Carrieres
                  </button>
                </div>
              </div>
              <button>
                <img
                  src="/favicon/vmdl.png"
                  alt="logo"
                  className="h-12 md:h-20"
                />
              </button>
              <button>Language</button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {!subExpertise ? (
                <motion.div
                  key="sectionButtons"
                  variants={sectionButtonsVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <button
                    data-clickable="true"
                    onClick={() => handleScroll(1)}
                    className="hover:scale-105 mr-6 sm:mr-28"
                  >
                    {section_1}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => handleScroll(2)}
                    className="hover:scale-105 mr-6 sm:mr-28"
                  >
                    {section_2}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => handleScroll(3)}
                    className="hover:scale-105 mr-6 sm:mr-28"
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
                </motion.div>
              ) : (
                <motion.div
                  key="backHomeButtons"
                  variants={backHomeButtonsVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <button
                    data-clickable="true"
                    onClick={() => setSubExpertise(null)}
                    className="hover:scale-105 mr-6 sm:mr-28"
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
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    );
  }
}
