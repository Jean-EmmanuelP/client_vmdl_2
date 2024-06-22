"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Cabinet from "./Cabinet/Cabinet";
import Legals from "./Components/Legals/Legals";
import Home from "./Home/Home";
import BackgroundEiffel from "./Components/BackgroundEiffel";
import {
  LangueCode,
  currentSectionContext,
  expertiseContext,
} from "./utils/Contextboard";
import { DataProvider } from "./utils/DataContext";
import { NavigatorWithConnection } from "./utils/interface";
import Honoraires from "./Components/Honoraires/Honoraires";
import ReversedArrow from "./assets/svg/reverseArrow";

{
  /* Importing the component from client */
}
const Contact = dynamic(() => import("./Contact/Contact"), { ssr: false });
const Expertise = dynamic(() => import("./Expertise/Expertise"), {
  ssr: false,
});
const Fondateur = dynamic(() => import("./Fondateur/Fondateur"), {
  ssr: false,
});
const Carriere = dynamic(() => import("./Components/Carriere/Carriere"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Footer/Footer"), { ssr: false });
const Vision = dynamic(() => import("./Vision/Vision"), { ssr: false });
const Header = dynamic(() => import("./Components/Header"), { ssr: false });
const CustomCursor = dynamic(() => import("./Components/Cursor"), {
  ssr: false,
});

{
  /* used to know if it is a mobile */
}
function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile;
}

export default function App() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [bgIsBlackFondateur, setBgIsBlackFondateur] = useState(false);
  const [bgIsBlackFooter, setBgIsBlackFooter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [goingOut, setIsGoingOut] = useState(false);
  const [mediaPaths, setMediaPaths] = useState({
    paris: `/videos/laptop/paris/paris_high.webm`,
    dubai: `/videos/laptop/dubai/dubai_high.webm`,
    qatar: `/videos/laptop/qatar/qatar_high.webm`,
    rio: `/videos/laptop/rio/rio_de_janeiro_high.webm`,
    newyork: `/videos/laptop/newyork/new-york_high.webm`,
    vosges: `/videos/laptop/vosges/vosges_high.webm`,
  });
  const toggleMenu = () => {
    if (menuOpen) {
      setIsGoingOut(true);

      setTimeout(() => {
        setMenuOpen(false);
        setIsGoingOut(false);
      }, 1000);
    } else {
      setMenuOpen(true);
    }
  };
  const isMobile = useMobileDetect();
  const [headerHeight, setHeaderHeight] = useState<"64px" | "128px" | "90px">(
    "128px"
  );
  const [onVideos, setOnVideos] = useState<boolean>(false);
  const [langueCourante, setLangueCourante] = useState<LangueCode>("FR");
  const [subExpertise, setSubExpertise] = useState<
    "conseil" | "contentieux" | "affaires" | null
  >(null);
  const [mainHeight, setMainHeight] = useState("100%");

  useEffect(() => {
    const newHeaderHeight =
      currentSection === 0
        ? !isMobile && pageIs === "/"
          ? "128px"
          : "90px"
        : "64px";
    pageIs === "/" && setHeaderHeight(newHeaderHeight);
  }, [currentSection, isMobile]);
  const [pageIs, setPageIs] = useState<string>("/");
  useEffect(() => {
    setHeaderHeight("64px");
  }, [pageIs]);

  useEffect(() => {
    if (pageIs === "/") {
      if (isMobile) {
        setHeaderHeight("90px");
      } else {
        setHeaderHeight("128px");
      }
    }
  }, [isMobile]);
  useEffect(() => {
    const availableHeight = `calc(100% - ${headerHeight}px)`;
    setMainHeight(availableHeight);
  }, [headerHeight]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keysToPrevent = [
        "Tab",
        "PageUp",
        "PageDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ];
      if (keysToPrevent.includes(event.code)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isScrolling) {
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isScrolling]);

  useEffect(() => {
    if (pageIs === "/") {
      const handleScroll = (direction: string) => {
        if (isScrolling) return;

        const mainDiv = document.getElementById("main");

        if (mainDiv) {
          let newSection = currentSection;
          if (direction === "down" && currentSection < 9) {
            newSection = currentSection + 1;
          } else if (direction === "up" && currentSection > 0) {
            newSection = currentSection - 1;
          }

          // Scroll vers la nouvelle section
          mainDiv.scrollTo({
            top: mainDiv.clientHeight * newSection,
            behavior: "smooth",
          });

          // Ajuste la hauteur de l'en-tête en fonction de la section
          if (newSection === 1 && pageIs === "/") {
            setHeaderHeight(!isMobile ? "128px" : "90px");
          } else {
            setHeaderHeight("64px");
          }

          // Met à jour la section actuelle et indique qu'un scroll est en cours
          setCurrentSection(newSection);
          setIsScrolling(true);
        }
      };

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault(); // Empêche le comportement de scroll par défaut
        handleScroll(e.deltaY > 0 ? "down" : "up"); // Détermine la direction du scroll
      };

      const main = document.getElementById("main");

      if (main) {
        main.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
          main.removeEventListener("wheel", handleWheel);
        };
      }
    }
  }, [currentSection, isScrolling, pageIs, isMobile]);

  const updateMediaPaths = useCallback(() => {
    const isMobile = window.innerWidth <= 768;

    const navigatorWithConnection = navigator as NavigatorWithConnection;
    const downlink = navigatorWithConnection.connection?.downlink ?? 10;

    let videoBasePath = "/videos/";
    videoBasePath += isMobile ? "mobile/" : "laptop/";

    let qualitySuffix = isMobile ? "high_mobile" : "high";

    if (downlink < 0.75) {
      qualitySuffix = isMobile ? "low_mobile" : "low";
    } else if (downlink >= 0.75 && downlink < 1) {
      qualitySuffix = isMobile ? "medium_mobile" : "medium";
    }
    setMediaPaths({
      paris: `${videoBasePath}paris/paris_${qualitySuffix}.webm`,
      dubai: `${videoBasePath}dubai/dubai_${qualitySuffix}.webm`,
      qatar: `${videoBasePath}qatar/qatar_${qualitySuffix}.webm`,
      newyork: `${videoBasePath}newyork/new-york_${qualitySuffix}.mp4`,
      rio: `${videoBasePath}rio/rio_de_janeiro_${qualitySuffix}.webm`,
      vosges: `${videoBasePath}vosges/vosges_${qualitySuffix}.webm`,
    });
  }, []);
  const [isHoveringExpertiseButton, setIsHoveringExpertiseButton] = useState<
    "conseil" | "contentieux" | "affaires" | "none"
  >("none");
  const homeRef = useRef(null);
  const cabinetRef = useRef(null);
  const expertiseRef = useRef(null);
  const visionRef = useRef(null);
  const fondateurRef = useRef(null);
  const contactRef = useRef(null);
  const carriereRef = useRef(null);
  const honoraireRef = useRef(null);
  const mainRef = useRef(null);
  const handleScrollSections = (ref: React.RefObject<HTMLDivElement>) => {
    const mainContainer = document.getElementById("main");
    if (mainContainer && ref.current) {
      const offsetTop = ref.current.offsetTop - mainContainer.offsetTop;

      mainContainer.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      if (ref.current === homeRef.current) {
        setCurrentSection(0);
      } else if (ref.current === cabinetRef.current) {
        setCurrentSection(1);
      } else if (ref.current === expertiseRef.current) {
        setCurrentSection(2);
      } else if (ref.current === visionRef.current) {
        setCurrentSection(3);
      } else if (ref.current === fondateurRef.current) {
        setCurrentSection(4);
      } else if (ref.current === carriereRef.current) {
        setCurrentSection(5);
      } else if (ref.current === honoraireRef.current) {
        setCurrentSection(6);
      } else if (ref.current === contactRef.current) {
        setCurrentSection(7);
      }
    }
  };

  return (
    <DataProvider>
      <div className="w-full h-full z-10 overflow-hidden font-riviera font-normal">
        <currentSectionContext.Provider
          value={{
            onVideos,
            setOnVideos,
            handleScrollSections,
            homeRef,
            cabinetRef,
            expertiseRef,
            visionRef,
            fondateurRef,
            carriereRef,
            honoraireRef,
            contactRef,
            isHoveringExpertiseButton,
            setIsHoveringExpertiseButton,
            isMobile,
            menuOpen,
            setMenuOpen,
            goingOut,
            setIsGoingOut,
            toggleMenu,
            bgIsBlackFondateur,
            setBgIsBlackFondateur,
            bgIsBlackFooter,
            setBgIsBlackFooter,
            langueCourante,
            setLangueCourante,
            currentSection,
            setCurrentSection,
            headerHeight,
            setHeaderHeight,
            mediaPaths,
            updateMediaPaths,
            pageIs,
            setPageIs,
          }}
        >
          <CustomCursor />
          <expertiseContext.Provider value={{ subExpertise, setSubExpertise }}>
            <Header height={headerHeight} />
            <div
              id="main"
              ref={mainRef}
              style={{ height: mainHeight }}
              className="w-full h-full z-1 overflow-y-auto overflow-x-hidden"
            >
              {pageIs === "/" && (
                <>
                  <div
                    className={`${
                      currentSection === 0 && "opacity-0"
                    } transition-all`}
                  >
                    <div
                      className={`${
                        bgIsBlackFondateur ? "bg-blanc" : "bg-noir"
                      } ${
                        (subExpertise === "contentieux" ||
                          subExpertise === "affaires") &&
                        "opacity-50"
                      } overflow-hidden hover:opacity-100 transition duration-500 absolute bottom-[3%] opacity-50 sm:opacity-100 sm:bottom-[5%] left-[10%] sm:left-[5%] w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] border border-blanc/50 shadow-2xl flex items-center justify-center rounded-full z-[2147483646] -translate-x-1/2`}
                      onMouseEnter={() => {
                        setBgIsBlackFooter(true);
                      }}
                      onMouseLeave={() => {
                        setBgIsBlackFooter(false);
                      }}
                    >
                      <div
                        className="flex items-center justify-center rotate-90 transition duration-100 z-[2147483646] w-1/2 h-1/2"
                        onClick={() => {
                          setBgIsBlackFooter(false);
                          handleScrollSections(homeRef);
                        }}
                      >
                        <ReversedArrow
                          isWhite={bgIsBlackFondateur ? false : true}
                        />
                      </div>
                      <div className="absolute inset-0 bg-cover bg-[url('/images/home/paris.png')] opacity-40"></div>
                    </div>
                  </div>
                  <div
                    ref={homeRef}
                    className={`w-full h-[calc(100vh-64px)] sm:h-full`}
                  >
                    <Home />
                  </div>
                  <div
                    ref={cabinetRef}
                    className={`w-full h-[calc(100vh-64px)] sm:h-full`}
                  >
                    <Cabinet />
                  </div>
                  <div
                    ref={expertiseRef}
                    className="w-full h-[calc(100vh-64px)] sm:h-full"
                  >
                    <Expertise />
                  </div>
                  <div
                    ref={visionRef}
                    className={`w-full h-[calc(100vh-64px)] sm:h-full`}
                  >
                    <Vision />
                  </div>
                  <div
                    ref={fondateurRef}
                    className={`w-full h-[calc(100vh-64px)] sm:h-full`}
                  >
                    <Fondateur />
                  </div>
                  <div
                    ref={carriereRef}
                    className={`w-full h-[calc(100vh-64px)] sm:h-full`}
                  >
                    <Carriere />
                  </div>
                  <div
                    ref={honoraireRef}
                    className={`w-full h-[calc(100vh-64px)] sm:h-full`}
                  >
                    <Honoraires />
                  </div>
                  <div
                    ref={contactRef}
                    className={`w-full h-[calc(100vh-64px)] sm:h-full`}
                  >
                    <Contact />
                  </div>
                  <div className="h-1/2 w-full">
                    <Footer />
                  </div>
                </>
              )}
              {pageIs === "legals" && (
                <>
                  <Legals />
                  <div className="h-1/2 w-full">
                    <Footer />
                  </div>
                </>
              )}
            </div>
            <BackgroundEiffel />
          </expertiseContext.Provider>
        </currentSectionContext.Provider>
      </div>
    </DataProvider>
  );
}
