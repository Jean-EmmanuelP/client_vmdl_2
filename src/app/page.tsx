"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  LangueCode,
  currentSectionContext,
  expertiseContext,
} from "./utils/Contextboard";
import { DataProvider } from "./utils/DataContext";

// comprendre la repectussion quand je mets en ssr si ca joue par rapport au SEO
const Cabinet = dynamic(() => import("./Cabinet/Cabinet"), { ssr: false });
const Contact = dynamic(() => import("./Contact/Contact"), { ssr: false });
const Expertise = dynamic(() => import("./Expertise/Expertise"), {
  ssr: true,
});
const Fondateur = dynamic(() => import("./Fondateur/Fondateur"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Footer/Footer"), { ssr: false });
const Home = dynamic(() => import("./Home/Home"), { ssr: true });
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
  const [mediaPaths, setMediaPaths] = useState({
    paris: `/videos/laptop/paris/paris_low.webm`,
    dubai: `/videos/laptop/dubai/dubai_low.webm`,
    qatar: `/videos/laptop/qatar/qatar_low.webm`,
    rio: `/videos/laptop/rio/rio_de_janeiro_low.webm`,
    vosges: `/videos/laptop/vosges/vosges_low.webm`,
  });
  const isMobile = useMobileDetect();
  const [headerHeight, setHeaderHeight] = useState<"64px" | "128px" | "90px">(
    "128px"
  );
  const [langueCourante, setLangueCourante] = useState<LangueCode>("FR");
  const [subExpertise, setSubExpertise] = useState<
    "conseil" | "contentieux" | "affaires" | null
  >(null);
  const [mainHeight, setMainHeight] = useState("100%");

  {
    /* check si cest sur telephone */
  }
  useEffect(() => {
    if (isMobile) {
      setHeaderHeight("90px");
    } else {
      setHeaderHeight("128px");
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
    const handleScroll = (direction: string) => {
      {
        /* si il scroll alors on fait aucune action, pour eviter deux scroll a la fois */
      }
      if (isScrolling) return;

      const mainDiv = document.getElementById("main");

      if (mainDiv) {
        if (direction === "down") {
          if (currentSection < 6) {
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
            if (currentSection === 1) {
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
  }, [currentSection, isScrolling]);

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



  useEffect(() => {
    const newHeaderHeight =
      currentSection === 0 ? (!isMobile ? "128px" : "90px") : "64px";
    setHeaderHeight(newHeaderHeight);
  }, [currentSection, isMobile]);

  interface NavigatorWithConnection extends Navigator {
    connection?: {
      downlink?: number;
      effectiveType?: string;
    };
  }

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
      rio: `${videoBasePath}rio/rio_de_janeiro_${qualitySuffix}.webm`,
      vosges: `${videoBasePath}vosges/vosges_${qualitySuffix}.webm`,
    });
  }, []);

  useEffect(() => {
    updateMediaPaths();
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DataProvider>
      {isLoading && (
        <div
          className="loading-screen"
          onAnimationEnd={() => setIsLoading(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" stroke="#fff">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle cx="5" cy="50" r="5">
                  <animate attributeName="cy" begin="0s" dur="2.2s" values="50;5;50;50" calcMode="linear" repeatCount="indefinite" />
                  <animate attributeName="cx" begin="0s" dur="2.2s" values="5;27;49;5" calcMode="linear" repeatCount="indefinite" />
                </circle>
                <circle cx="27" cy="5" r="5">
                  <animate attributeName="cy" begin="0s" dur="2.2s" from="5" to="5" values="5;50;50;5" calcMode="linear" repeatCount="indefinite" />
                  <animate attributeName="cx" begin="0s" dur="2.2s" from="27" to="27" values="27;49;5;27" calcMode="linear" repeatCount="indefinite" />
                </circle>
                <circle cx="49" cy="50" r="5">
                  <animate attributeName="cy" begin="0s" dur="2.2s" values="50;50;5;50" calcMode="linear" repeatCount="indefinite" />
                  <animate attributeName="cx" from="49" to="49" begin="0s" dur="2.2s" values="49;5;27;49" calcMode="linear" repeatCount="indefinite" />
                </circle>
              </g>
            </g>
          </svg>
        </div>
      )}

      <div className="w-full h-full z-10 overflow-hidden font-riviera font-normal">

        <currentSectionContext.Provider
          value={{
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
            setIsLoading
          }}
        >
          <CustomCursor />
          <expertiseContext.Provider value={{ subExpertise, setSubExpertise }}>
            <Header height={headerHeight} />

            <div
              id="main"
              style={{ height: mainHeight }}
              className="w-full z-1 overflow-y-auto overflow-x-hidden"
            >
              <Home />
              <Cabinet />
              <Expertise />
              <Vision />
              <Fondateur />
              <Contact />
              <Footer />
            </div>
            <BackgroundEiffel />
          </expertiseContext.Provider>
        </currentSectionContext.Provider>
      </div>
    </DataProvider>
  );
}
