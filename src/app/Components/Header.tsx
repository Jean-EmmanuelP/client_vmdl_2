"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { StylesConfig } from "react-select";
import _ from "lodash";
import Back from "../assets/svg/Back";
import Home from "../assets/svg/Home";
import Menu from "../assets/svg/Menu";

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
    "&:hover": { backgroundColor: "#A9A9A9", color: "black" },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    zIndex: 2145483645,
    color: "black",
    backgroundColor: isFocused ? "lightgray" : isSelected ? "gray" : "#F9F9F9",
    padding: 20,
    "&:hover": { color: "black" }
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 2145483645,
    borderColor: "black",
    borderRadius: "0",
    "&:hover": { color: "black" }
  }),
  placeholder: (styles) => ({
    ...styles,
    zIndex: 2145483645,
    color: "black",
    "&:hover": { color: "black" }
  }),
  singleValue: (styles) => ({
    ...styles,
    zIndex: 2145483645,
    color: "white",
    "&:hover": { color: "black" }
  }),
};

export default function Header({ height }: HeaderProps) {
  const { setCurrentSection ,setPageIs, cabinetRef, expertiseRef, fondateurRef, homeRef, visionRef, handleScrollSections } = useSection();
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
    console.log(`options available:`, options); // Ajoutez cette ligne pour inspecter les options disponibles
    const matchingOption = options.find((option) => option.value);
    !matchingOption
      ? setSelectedOption(options[1])
      : setSelectedOption(matchingOption);
    console.log(`this is the selectedOption`, matchingOption);
    setLangueCourante(appLang);
  }, []);
  const animatedComponents = makeAnimated();

  // langue code ici utilise deux fois
  type LangueCode = "FR" | "EN" | "IT" | "ES" | "عربي" | "PT" | "DE" | "中文";
  //  pareil ici cest un const on sen fou de le mettre ici
  const LANGUAGE_NAMES = {
    FR: { native: "Français", en: "French", fr: "Français" },
    EN: { native: "English", en: "English", fr: "Anglais" },
    IT: { native: "Italiano", en: "Italian", fr: "Italien" },
    ES: { native: "Español", en: "Spanish", fr: "Espagnol" },
    عربي: { native: "العربية", en: "Arabic", fr: "Arabe" },
    PT: { native: "Português", en: "Portuguese", fr: "Portugais" },
    DE: { native: "Deutsch", en: "German", fr: "Allemand" },
    中文: { native: "中文", en: "Chinese", fr: "Chinois" },
  };
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
  const options = Object.entries(LANGUAGE_TO_COUNTRY_CODES).flatMap(
    ([langue, countries]) =>
      countries.map((country) => {
        const languageDetails =
          LANGUAGE_NAMES[langue as keyof typeof LANGUAGE_NAMES];

        return {
          value: country,
          label: <>{country}</>,
          searchTerms: [
            languageDetails?.native,
            languageDetails?.en,
            languageDetails?.fr,
          ],
        };
      })
  );
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

  const handleLanguageChange = (newValue: any) => {
    if (newValue) {
      const langue = COUNTRY_TO_DEFAULT_LANGUAGE[newValue.value];
      setLangueCourante(langue as LangueCode);
      const matchingOption = options.find(
        (option) => option.value === newValue.value
      );
      setSelectedOption(matchingOption);
    }
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
                <div className="flex items-end justify-around flex-col w-full h-1/2 absolute top-1/2 right-[2px] -translate-y-1/2">
                  <button
                    data-clickable="true"
                    onClick={() => {
                      toggleMenu();
                      setPageIs("/");
                      setTimeout(() => {
                        handleScrollSections(cabinetRef);
                      }, 200);
                    }}
                    className="hover:scale-105 pr-16 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                    className="hover:scale-105 pr-16 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                    className="hover:scale-105 pr-16 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                    className="hover:scale-105 pr-16 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
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
                    className="hover:scale-105 pr-16 uppercase transition duration-150 text-gray-300/70 font-bold hover:text-blanc"
                  >
                    {/* TODO */}
                    {carreer_title}
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  handleScrollSections(homeRef);
                  setPageIs("/");
                }}
                data-clickable="true"
              >
                <p className="tracking-wider text-[20px] sm:text-[30px] z-[21020]">
                  VMDL
                </p>
              </button>
              <div className="flex justify-center items-center p-2">
                <Select
                  data-clickable={true}
                  styles={customStyles}
                  components={animatedComponents}
                  options={options as any}
                  filterOption={filterOption}
                  value={selectedOption}
                  onChange={handleLanguageChange}
                />
              </div>
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
                    onClick={() => {
                      handleScrollSections(cabinetRef);
                    }}
                    className="hover:scale-105 mr-6 sm:mr-28"
                  >
                    {section_1}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => {
                      handleScrollSections(expertiseRef);
                    }}
                    className="hover:scale-105 mr-6 sm:mr-28"
                  >
                    {section_2}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => {
                      handleScrollSections(visionRef);
                    }}
                    className="hover:scale-105 mr-6 sm:mr-28"
                  >
                    {section_3}
                  </button>
                  <button
                    data-clickable="true"
                    onClick={() => {
                      handleScrollSections(fondateurRef);
                    }}
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
                      handleScrollSections(homeRef);
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
