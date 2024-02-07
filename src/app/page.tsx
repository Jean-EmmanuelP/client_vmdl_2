"use client";

import { useEffect, useState } from "react";
import Cabinet from "./Cabinet/Cabinet";
import Contact from "./Contact/Contact";
import Expertise from "./Expertise/Expertise";
import Fondateur from "./Fondateur/Fondateur";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Vision from "./Vision/Vision";
import Header from "./Components/Header";
import { LangueCode, currentSectionContext, expertiseContext } from "./utils/Contextboard";
import { DataProvider } from './utils/DataContext';
import BackgroundEiffel from "./Components/BackgroundEiffel";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./Components/Cursor"), {
  ssr: false,

});

function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px est généralement la largeur max pour les appareils mobiles en mode portrait
    };

    // Vérifier une fois et ensuite ajouter un écouteur d'événement pour les changements de taille
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
}

export default function App() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const isMobile = useMobileDetect();
  const [headerHeight, setHeaderHeight] = useState<"64px" | "128px" | "90px">("128px");
  const [langueCourante, setLangueCourante] = useState<LangueCode>("FR");
  const [subExpertise, setSubExpertise] = useState<
    "conseil" | "contentieux" | "affaires" | null
  >(null);
  const [mainHeight, setMainHeight] = useState("100%");

  useEffect(() => {
    if (isMobile) {
      console.log(`its mobile`);
      setHeaderHeight("90px");
    } else {
      setHeaderHeight("128px");
    }
  }, [isMobile]);
  useEffect(() => {
    const availableHeight = `calc(100% - ${headerHeight}px)`;
    setMainHeight(availableHeight);
  }, [headerHeight]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
    };
    window.addEventListener("keydown", handleKeyDown);

    window.scrollTo({ top: 0, behavior: "smooth" });
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
    const handleScroll = (direction: string) => {
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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/take-content");
      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      const data = await response.json();
      console.log(`Here is the response data`, data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const newHeaderHeight = currentSection === 0 ? (!isMobile ? "128px" : "90px") : "64px";
    setHeaderHeight(newHeaderHeight);
  }, [currentSection, isMobile]);

  return (
    
    <DataProvider>
    <div className="w-full h-full z-10 overflow-hidden font-riviera font-normal">
      <CustomCursor />
      <currentSectionContext.Provider
        value={{
          langueCourante,
          setLangueCourante,
          currentSection,
          setCurrentSection,
          headerHeight,
          setHeaderHeight,
        }}
      >
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
