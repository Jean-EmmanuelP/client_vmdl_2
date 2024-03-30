"use client";
/*
  La question qui se pose c'est comment ameliorer le code ?
  Faut il faire moins de useEffect ? faut-il reduire la taille de son code, le nombre de loop utilise ?
  La question qui se pose c'est est-ce que le code qui se repete affecte les performances,
  est-ce que les librairies utilises et trop lourdes impactent
  les performances et comment savoir qui elles sont ?
  Aussi comment le contextboard, soit les proprietes partage entre tout mes composants peut affecter les performances de mon site ?
*/
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import Cabinet from "./Cabinet/Cabinet";
import Carriere from "./Components/Carriere/Carriere";
import Legals from "./Components/Legals/Legals";
import Home from "./Home/Home";
import {
  LangueCode,
  currentSectionContext,
  expertiseContext,
} from "./utils/Contextboard";
import { DataProvider } from "./utils/DataContext";
import { NavigatorWithConnection } from "./utils/interface";
const Contact = dynamic(() => import("./Contact/Contact"), { ssr: false });
const Expertise = dynamic(() => import("./Expertise/Expertise"), {
  ssr: false,
});
const Fondateur = dynamic(() => import("./Fondateur/Fondateur"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Footer/Footer"), { ssr: false });
const Vision = dynamic(() => import("./Vision/Vision"), { ssr: false });
const Header = dynamic(() => import("./Components/Header"), { ssr: false });
const BackgroundEiffel = dynamic(
  () => import("./Components/BackgroundEiffel"),
  { ssr: false }
);
const CustomCursor = dynamic(() => import("./Components/Cursor"), {
  ssr: false,
});

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
    paris: `/videos/laptop/paris/paris_low.webm`,
    dubai: `/videos/laptop/dubai/dubai_low.webm`,
    qatar: `/videos/laptop/qatar/qatar_low.webm`,
    rio: `/videos/laptop/rio/rio_de_janeiro_low.webm`,
    newyork: `/videos/laptop/rio/new-york_low.webm`,
    vosges: `/videos/laptop/vosges/vosges_low.webm`,
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
  {
    /* check si cest sur telephone */
  }
  useEffect(() => {
    if (pageIs === "/") {
      if (isMobile) {
        setHeaderHeight("90px");
      } else {
        setHeaderHeight("128px");
      }
    }
  }, [isMobile]);
  {
    /* met la taille du home en fonction de la taille du header */
  }
  useEffect(() => {
    const availableHeight = `calc(100% - ${headerHeight}px)`;
    setMainHeight(availableHeight);
  }, [headerHeight]);

  {
    /* gere les touches clavier pour que aucun comportement soit execute si touche */
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (typeof window !== "undefined") {
        if (
          [
            "Tab",
            "PageUp",
            "PageDown",
            "Arrow",
            "ArrowLeft",
            "ArrowUp",
            "ArrowDown",
          ].includes(event.code)
        ) {
          event.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  {
    /* call a chaque scroll, pour tel quand toucher soit vers le haut ou le bas alors comportement === scrolling */
  }
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

  {
    /* gere la dynamique de scrolling soit le fait que si tu scrolles vers le haut ou le bas, ca se deplacera jusqua ou,
      sur telephone je peux ajoute le comportement ici */
  }
  useEffect(() => {
    if (pageIs === "/") {
      const handleScroll = (direction: string) => {
        {
          /* si il scroll alors on fait aucune action, pour eviter deux scroll a la fois */
        }
        if (isScrolling) return;

        const mainDiv = document.getElementById("main");

        if (mainDiv) {
          if (direction === "down") {
            if (currentSection < 7) {
              mainDiv.scrollTo({
                top: mainDiv.clientHeight * (currentSection + 1),
                behavior: "smooth",
              });
              setHeaderHeight("64px");
              setCurrentSection(currentSection + 1);
            }
          } else if (direction === "up") {
            if (currentSection > 0) {
              mainDiv.scrollTo({
                top: mainDiv.clientHeight * (currentSection - 1),
                behavior: "smooth",
              });
              if (currentSection === 1 && pageIs === "/") {
                setHeaderHeight(!isMobile ? "128px" : "90px");
              }
              setCurrentSection(currentSection - 1);
            }
          }
          setSubExpertise(null);
          setIsScrolling(true);
        }
      };

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        handleScroll(e.deltaY > 0 ? "down" : "up");
      };

      const main = document.getElementById("main");

      if (main) {
        main.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
          main.removeEventListener("wheel", handleWheel);
        };
      }
    }
  }, [currentSection, isScrolling, pageIs]);

  {
    /* prends les donnees depuis le github */
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/take-content");
      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      const data = await response.json();
    }
    fetchData();
  }, []);

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
      newyork: `${videoBasePath}newyork/new-york_${qualitySuffix}.webm`,
      rio: `${videoBasePath}rio/rio_de_janeiro_${qualitySuffix}.webm`,
      vosges: `${videoBasePath}vosges/vosges_${qualitySuffix}.webm`,
    });
  }, []);
  const [isHoveringExpertiseButton, setIsHoveringExpertiseButton] = useState<
    "conseil" | "contentieux" | "affaires" | "none"
  >("none");
  const [isHere, setIsHere] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  useEffect(() => {
    updateMediaPaths();
    if (isFirstLoad) {
      setTimeout(() => {
        setIsHere(false);
      }, 4000);
      setIsFirstLoad(false);
    }
  }, []);
  const homeRef = useRef(null);
  const cabinetRef = useRef(null);
  const expertiseRef = useRef(null);
  const visionRef = useRef(null);
  const fondateurRef = useRef(null);
  const contactRef = useRef(null);
  const carriereRef = useRef(null);
  const mainRef = useRef(null);
  const handleScrollSections = (ref: React.RefObject<HTMLDivElement>) => {
    const mainContainer = document.getElementById('main');
    if (mainContainer && ref.current) {
      const offsetTop = ref.current.offsetTop - mainContainer.offsetTop;

      mainContainer.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
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
      }
    }
  };


  return (
    <DataProvider>
      {isHere && (
        <div className="loading-screen z-[2147483647]">
          <div className="lds-dual-ring"></div>
        </div>
      )}

      <div className="w-full h-full z-10 overflow-hidden font-riviera font-normal">
        <currentSectionContext.Provider
          value={{
            handleScrollSections,
            homeRef,
            cabinetRef,
            expertiseRef,
            visionRef,
            fondateurRef,
            carriereRef,
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
                  <div ref={homeRef} className="w-full h-full">
                    <Home />
                  </div>
                  <div ref={cabinetRef} className="w-full h-full">
                    <Cabinet />
                  </div>
                  <div ref={expertiseRef} className="w-full h-[130vh] sm:h-full">
                    <Expertise />
                  </div>
                  <div ref={visionRef} className="w-full h-full">
                    <Vision />
                  </div>
                  <div ref={fondateurRef} className="w-full h-full">
                    <Fondateur />
                  </div>
                  <div ref={carriereRef} className="w-full h-full">
                    <Carriere />
                  </div>
                  <div ref={contactRef} className="w-full h-full">
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
                  <Footer />
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
