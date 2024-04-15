"use client";

import { AnimatePresence, motion } from "framer-motion";
import throttle from 'lodash/throttle';
import { useEffect, useRef, useState } from "react";
import Menu from "../assets/svg/Menu";
import { useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

interface HeaderProps {
  height: "64px" | "128px" | "90px";
}

export default function Header({ height }: HeaderProps) {
  const {
    currentSection,
    setPageIs,
    cabinetRef,
    expertiseRef,
    fondateurRef,
    carriereRef,
    honoraireRef,
    contactRef,
    visionRef,
    setBgIsBlackFooter,
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
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { loadData, data } = useData();
  const { setSubExpertise } = useExpertise();
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
    const handleScrollThrottled = throttle(detectScroll, 100);

    window.addEventListener("scroll", handleScrollThrottled);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
    };
  }, [lastScrollY]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 500)
    setTimeout(() => {

    })
  }, [])
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

  const { section_1, section_2, section_3, section_4, section_5, section_6 } = data[langCode].header;
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
        ref={headerRef}
        transition={{ duration: 0.6 }}
        className="w-full z-10 text-blanc flex justify-center items-center text-sm md:text-lg gap-28"
      >
        <div
          className={`relative h-full flex justify-center items-center w-[80%] gap-10 md:gap-28`}
        >
          <div className={`absolute bottom-0 w-[95%] sm:w-[90%] h-2 overflow-hidden`}>
            <div className={`${!isVisible ? '-translate-x-[100%]' : 'translate-x-0'} absolute w-full transition duration-1000 ${height === '128px' || height === '90px' ? 'h-[1px]' : 'h-0'} w-full bottom-0 bg-blanc`}></div>
          </div>
          <div className={`${!isVisible ? 'opacity-0 sm:translate-y-7 translate-y-3' : 'opacity-100 translate-y-0'} z-[30] transition duration-700 delay-1000 absolute right-0 w-[17%] sm:w-[6%] sm:-right-[9%] h-full flex items-center justify-center transparent text-xs sm:text-sm`}>
            <div
              className={`flex flex-col text-center z-[2147483647] items-center justify-center w-fit h-fit overflow-hidden`}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div
                ref={selectRef}
                className={`text-noir bg-blanc z-[2147483647] shadow-xl h-7 w-7 sm:h-10 sm:w-10 flex items-center justify-center`}
                onMouseEnter={() => setIsOpen(true)}
              >
                {langueCourante}
              </div>
              <div
                ref={optionRef}
                className={`absolute top-[60%] z-[2147483647] mt-3 ${isOpen ? "block" : "opacity-0 pointer-events-none "
                  } `}
                onMouseEnter={() => setIsOpen(true)}
              >
                {languesOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`${option.value === langueCourante && "hidden"
                      } mt-3 bg-blanc text-noir hover:scale-110 shadow-xl z-[2147483647] h-7 w-7 sm:h-10  sm:w-10 flex items-center justify-center transition duration-300 group-hover:translate-y-0 ${isOpen
                        ? "opacity-100 translate-y-0"
                        : "group-hover:opacity-100 opacity-0 -translate-y-2 delay-0"
                      }`}
                    data-value={option.value}
                    onClick={() => { handleOptionClick(option.value); setIsOpen(false) }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-start sm:justify-around w-full">
            {isMobile ? (
              <>
                <button
                  onClick={toggleMenu}
                  className=" flex justify-center items-center gap-2 z-[1000000110]"
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
                  className={`menu ${menuOpen ? "open" : ""} ${goingOut ? "close" : ""
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
                      className="hover:scale-105 pr-7  transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                      className="hover:scale-105 pr-7  transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                      className="hover:scale-105 pr-7  transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                      className="hover:scale-105 pr-7  transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                      className="hover:scale-105 pr-7  transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {/* TODO */}
                      {carreer_title}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(honoraireRef);
                        }, 200);
                      }}
                      className="hover:scale-105 pr-7  transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {section_5}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(contactRef);
                        }, 200);
                      }}
                      className="hover:scale-105 pr-7 transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                    >
                      {section_6}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-[100%]">
                  <div className="px-4 w-full flex justify-around">
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(cabinetRef);
                        }, 200);
                      }}
                      className={`${!isVisible ? 'opacity-0' : 'opacity-100'} group  transition duration-700 flex items-center justify-center overflow-hidden hover:text-blanc font-medium relative`}
                    >
                      <div
                        className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${currentSection === 1
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
                      className={`${!isVisible ? 'opacity-0' : 'opacity-100'} group overflow-hidden  transition duration-700 delay-75 flex items-center justify-center hover:text-blanc font-medium relative`}
                    >
                      <div
                        className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${currentSection === 2
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
                      className={`${!isVisible ? 'opacity-0' : 'opacity-100'} delay-150 group overflow-hidden  transition duration-700 flex items-center justify-center hover:text-blanc font-medium relative`}
                    >
                      <div
                        className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${currentSection === 3
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
                      className={`${!isVisible ? 'opacity-0' : 'opacity-100'} group overflow-hidden  transition duration-700 delay-200 flex items-center justify-center hover:text-blanc font-medium relative`}
                    >
                      <div
                        className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${currentSection === 4
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
                      className={`${!isVisible ? 'opacity-0' : 'opacity-100'} group overflow-hidden  transition duration-700 delay-300 flex items-center justify-center hover:text-blanc font-medium relative`}
                    >
                      <div
                        className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${currentSection === 5
                          ? "-translate-x-0"
                          : "group-hover:-translate-x-0 -translate-x-[100%]"
                          }`}
                      ></div>
                      {carreer_title}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(honoraireRef);
                        }, 200);
                      }}
                      className={`${!isVisible ? 'opacity-0' : 'opacity-100'} group overflow-hidden  transition duration-700 delay-300 flex items-center justify-center hover:text-blanc font-medium relative`}
                    >
                      <div
                        className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${currentSection === 6
                          ? "-translate-x-0"
                          : "group-hover:-translate-x-0 -translate-x-[100%]"
                          }`}
                      ></div>
                      {section_5}
                    </button>
                    <button
                      data-clickable="true"
                      onClick={() => {
                        toggleMenu();
                        setPageIs("/");
                        setTimeout(() => {
                          handleScrollSections(contactRef);
                        }, 200);
                      }}
                      className={`${!isVisible ? 'opacity-0' : 'opacity-100'} group overflow-hidden transition duration-700 delay-300 flex items-center justify-center font-medium relative`}
                    >
                      <div
                        className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${currentSection === 7
                          ? "-translate-x-0"
                          : "group-hover:-translate-x-0 -translate-x-[100%]"
                          }`}
                      ></div>
                      {section_6}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
}
