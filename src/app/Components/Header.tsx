"use client";

import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import Menu from "../assets/svg/Menu";
import { useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

interface HeaderProps {
  height: "64px" | "128px" | "90px";
}

const customStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "none",
    zIndex: 2147483645,
    borderRadius: "0",
    boxShadow: "none",
    border: "1px",
    color: "white",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    zIndex: 2145483645,
    color: "black",
    backgroundColor: isFocused ? "lightgray" : isSelected ? "gray" : "#F9F9F9",
    padding: 20,
    "&:hover": { color: "black" },
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 2145483645,
    borderColor: "black",
    borderRadius: "0",
    "&:hover": { color: "black" },
  }),
  placeholder: (styles) => ({
    ...styles,
    zIndex: 2145483645,
    color: "black",
    "&:hover": { color: "black" },
  }),
  singleValue: (styles) => ({
    ...styles,
    zIndex: 2145483645,
    color: "white",
    "&:hover": { color: "black" },
  }),
};

export default function Header({ height }: HeaderProps) {
  const {
    setCurrentSection,
    currentSection,
    setPageIs,
    pageIs,
    cabinetRef,
    expertiseRef,
    fondateurRef,
    homeRef,
    visionRef,
    handleScrollSections,
  } = useSection();
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante, setLangueCourante, isMobile } = useSection();
  const [selectedOption, setSelectedOption] = useState<
    { value: string; label: JSX.Element } | undefined
  >();
  const { loadData, data } = useData();
  const { menuOpen, goingOut, toggleMenu } = useSection();
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // check si ca c'est pas une logique commune et utiliser dans d'autres composants
  useEffect(() => {
    const supportedLangs: LangueCode[] = [
      "FR",
      "EN",
      "IT",
      "ES",
      "عربي",
      "PT",
      "DE",
      "中文",
    ];

    const browserLang = navigator.language.slice(0, 2).toUpperCase();
    const isLangueCode = (lang: any): lang is LangueCode =>
      supportedLangs.includes(lang);
    const appLang = isLangueCode(browserLang) ? browserLang : "EN";
    console.log(`this is the appLangue`, appLang);
    console.log(`this is the langueCourante`, langueCourante);
    setLangueCourante(appLang);
  }, []);
  const animatedComponents = makeAnimated();

  // langue code ici utilise deux fois
  type LangueCode = "FR" | "EN" | "IT" | "ES" | "عربي" | "PT" | "DE" | "中文";
  const languesOptions = [
    { value: "FR", label: "Français" },
    { value: "EN", label: "English" },
    { value: "IT", label: "Italiano" },
    { value: "ES", label: "Español" },
    { value: "عربي", label: "عربي" },
    { value: "PT", label: "Português" },
    { value: "DE", label: "Deutsch" },
    { value: "中文", label: "中文" },
  ];
  //  pareil ici cest un const on sen fou de le mettre ici
  const LANGUAGE_TO_COUNTRY_CODES: Record<LangueCode, string[]> = {
    FR: ["FR"],
    EN: ["US", "GB"],
    IT: ["IT"],
    ES: ["ES", "MX"],
    عربي: ["SA", "QA", "AE"],
    PT: ["PT", "BR"],
    DE: ["DE"],
    中文: ["CN"],
  };

  // interface ici faire un fichier pour les interfaces
  interface Option {
    value: string;
    label: JSX.Element;
    searchTerms: string[];
  }

  const filterOption = (option: any, inputValue: string) => {
    const { data } = option as { label: string; value: string; data: Option };
    return data.searchTerms.some((term: string) =>
      term.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // meme chose
  const COUNTRY_TO_DEFAULT_LANGUAGE: Record<string, LangueCode> = {
    US: "EN",
    GB: "EN",
    FR: "FR",
    IT: "IT",
    ES: "ES",
    MX: "ES",
    SA: "عربي",
    QA: "عربي",
    AE: "عربي",
    PT: "PT",
    BR: "PT",
    DE: "DE",
    CN: "中文",
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLangueCourante(event.target.value as LangueCode);
  };
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
  // se renseigner a quel point ceci est energivore
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

  useEffect(() => {
    console.log(`this is the current section`, currentSection);
  }, [currentSection]);

  if (!data) {
    return;
  }

  // fichier global pour ses const
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
  // pareil ici mettre dans un fichier global
  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];

  const { section_1, section_2, section_3, section_4 } = data[langCode].header;
  const carreer_title = data[langCode].carreer.title;

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
          } relative h-full flex justify-center items-center w-[80%] gap-10 md:gap-28`}
        >
          <div className="absolute right-0 -bottom-12 sm:-bottom-14 flex justify-center items-center transparent text-xs sm:text-sm">
            <select
              className="bg-blanc border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={langueCourante}
              onChange={handleLanguageChange}
            >
              {languesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-start sm:justify-around w-full">
            {isMobile ? (
              <>
                <button
                  onClick={toggleMenu}
                  className="uppercase flex justify-center items-center gap-2 z-[1000000110]"
                  data-clickable={true}
                >
                  <div className="w-4 h-4" data-clickable={true}>
                    <Menu toggleMenu={menuOpen} />
                  </div>
                  <AnimatePresence mode="wait">
                    {menuOpen ? (
                      <motion.p
                        key="close"
                        className="text-[13px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        data-clickable={true}
                        transition={{ duration: 0.2 }}
                      >
                        Close
                      </motion.p>
                    ) : (
                      <motion.p
                        key="menu"
                        className="text-[13px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        data-clickable={true}
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
                  <div className="flex items-end justify-around flex-col w-full h-1/2 absolute top-1/2 right-[40px] -translate-y-1/2">
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(cabinetRef);
                        }, 200);
                      }}
                      className="hover:scale-105 pr-7 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {section_1}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(expertiseRef);
                        }, 200);
                      }}
                      className="hover:scale-105 pr-7 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {section_2}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(visionRef);
                        }, 200);
                      }}
                      className="hover:scale-105 pr-7 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {section_3}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(fondateurRef);
                        }, 200);
                      }}
                      className="hover:scale-105 pr-7 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {section_4}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("carriere");
                        handleScrollSections(homeRef);
                      }}
                      className="hover:scale-105 pr-7 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {/* TODO */}
                      {carreer_title}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  data-clickable="true"
                  onClick={() => {
                    toggleMenu();
                    setPageIs("/");
                    setTimeout(() => {
                      handleScrollSections(cabinetRef);
                    }, 200);
                  }}
                  className="group uppercase transition duration-150 flex items-center justify-center overflow-hidden hover:text-blanc font-medium relative"
                >
                  <div
                    className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${
                      currentSection === 1
                        ? "-translate-x-0"
                        : "group-hover:-translate-x-0 -translate-x-[100%]"
                    }`}
                  ></div>
                  {section_1}
                </button>
                <button
                  data-clickable="true"
                  onClick={() => {
                    toggleMenu();
                    setPageIs("/");
                    setTimeout(() => {
                      handleScrollSections(expertiseRef);
                    }, 200);
                  }}
                  className="group overflow-hidden uppercase transition duration-150 flex items-center justify-center hover:text-blanc font-medium relative"
                >
                  <div
                    className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${
                      currentSection === 2
                        ? "-translate-x-0"
                        : "group-hover:-translate-x-0 -translate-x-[100%]"
                    }`}
                  ></div>
                  {section_2}
                </button>
                <button
                  data-clickable="true"
                  onClick={() => {
                    toggleMenu();
                    setPageIs("/");
                    setTimeout(() => {
                      handleScrollSections(visionRef);
                    }, 200);
                  }}
                  className="group overflow-hidden uppercase transition duration-150 flex items-center justify-center hover:text-blanc font-medium relative"
                >
                  <div
                    className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${
                      currentSection === 3
                        ? "-translate-x-0"
                        : "group-hover:-translate-x-0 -translate-x-[100%]"
                    }`}
                  ></div>
                  {section_3}
                </button>
                <button
                  data-clickable="true"
                  onClick={() => {
                    toggleMenu();
                    setPageIs("/");
                    setTimeout(() => {
                      handleScrollSections(fondateurRef);
                    }, 200);
                  }}
                  className="group overflow-hidden uppercase transition duration-150 flex items-center justify-center hover:text-blanc font-medium relative"
                >
                  <div
                    className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${
                      currentSection === 4
                        ? "-translate-x-0"
                        : "group-hover:-translate-x-0 -translate-x-[100%]"
                    }`}
                  ></div>
                  {section_4}
                </button>
                <button
                  data-clickable="true"
                  onClick={() => {
                    toggleMenu();
                    setPageIs("carriere");
                    handleScrollSections(homeRef);
                  }}
                  className="group overflow-hidden uppercase transition duration-150 flex items-center justify-center hover:text-blanc font-medium relative"
                >
                  <div
                    className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${
                      pageIs === "carriere"
                        ? "-translate-x-0"
                        : "group-hover:-translate-x-0 -translate-x-[100%]"
                    }`}
                  ></div>
                  {carreer_title}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
}
