"use client";

import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import Menu from "../assets/svg/Menu";
import { useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

interface HeaderProps {
  height: "64px" | "128px" | "90px";
}

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
    carriereRef,
    visionRef,
    handleScrollSections,
  } = useSection();
  const {
    menuOpen,
    goingOut,
    toggleMenu,
    langueCourante,
    setLangueCourante,
    isMobile,
  } = useSection();
  const { loadData, data } = useData();
  const { setSubExpertise } = useExpertise();
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  // langue code ici utilise deux fois
  type LangueCode = "FR" | "EN" | "IT" | "ES" | "عربي" | "PT" | "DE" | "中文";
  const languesOptions = [
    { value: "FR", label: "FR" },
    { value: "EN", label: "EN" },
    { value: "IT", label: "IT" },
    { value: "ES", label: "ES" },
    { value: "عربي", label: "عربي" },
    { value: "PT", label: "PT" },
    { value: "DE", label: "DE" },
    { value: "中文", label: "中文" },
  ];

  const handleOptionClick = (value: string) => {
    const event: React.ChangeEvent<HTMLSelectElement> = {
      target: { value },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleLanguageChange(event);
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
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        optionRef.current &&
        !optionRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, toggleMenu, isOpen]);
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
  const delayOnIndex = [200, 400, 600, 800, 1000, 1200, 300000, 300000];
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
          <div className="absolute right-0 w-[17%] sm:w-[6%] sm:-right-[9%] h-full flex items-center justify-center transparent text-xs sm:text-sm">
            <div className="flex overflow-hidden bg-blanc w-fit h-fit items-center justify-center">
            <div className="w-1/3 h-1/3 flex items-center justify-center">
              <img src="data:image/png;base64,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" alt="" />
            </div>
            <div
              className={`bg-blanc flex flex-col text-center items-center justify-center w-fit h-fit overflow-hidden`}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <div
                ref={selectRef}
                className={`text-noir shadow-xl h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center`}
              >
                {langueCourante}
              </div>
              <div
                ref={optionRef}
                className={`absolute top-[60%] z-[12121221] mt-3 ${
                  isOpen ? "block" : "opacity-0 pointer-events-none"
                } `}
              >
                {languesOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`${
                      option.value === langueCourante && "hidden"
                    } mt-3 bg-blanc text-noir shadow-xl h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center transition duration-300 group-hover:translate-y-0 ${
                      isOpen
                        ? "opacity-100 translate-y-0"
                        : "group-hover:opacity-100 opacity-0 -translate-y-2 delay-0"
                    }`}
                    data-value={option.value}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
            </div>
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
                        setSubExpertise(null);
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
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(carriereRef);
                        }, 200);
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
                    setSubExpertise(null);
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
                    setPageIs("/");
                    setTimeout(() => {
                      handleScrollSections(carriereRef);
                    }, 200);
                  }}
                  className="group overflow-hidden uppercase transition duration-150 flex items-center justify-center hover:text-blanc font-medium relative"
                >
                  <div
                    className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${
                      currentSection === 5
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
