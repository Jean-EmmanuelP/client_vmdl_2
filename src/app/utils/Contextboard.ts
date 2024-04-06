import React, { createContext, useContext } from "react";

/* cree un fichier avec tout les types */
export type LangueCode =
  | "FR"
  | "EN"
  | "IT"
  | "ES"
  | "عربي"
  | "PT"
  | "DE"
  | "中文";
// pour les interfaces ici creer un fichier interface
interface MediaPaths {
  paris: string;
  dubai: string;
  qatar: string;
  rio: string;
  vosges: string;
  newyork: string;
}

interface currentSectionProps {
  handleScrollSections: (e: React.RefObject<HTMLDivElement>) => void;
  homeRef: React.RefObject<HTMLDivElement>;
  cabinetRef: React.RefObject<HTMLDivElement>;
  expertiseRef: React.RefObject<HTMLDivElement>;
  visionRef: React.RefObject<HTMLDivElement>;
  fondateurRef: React.RefObject<HTMLDivElement>;
  carriereRef: React.RefObject<HTMLDivElement>;
  honoraireRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
  isHoveringExpertiseButton: "conseil" | "contentieux" | "affaires" | "none";
  setIsHoveringExpertiseButton: React.Dispatch<
    React.SetStateAction<"conseil" | "contentieux" | "affaires" | "none">
  >;
  isMobile: boolean;
  onVideos: boolean;
  setOnVideos: React.Dispatch<React.SetStateAction<boolean>>
  currentSection: number;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  goingOut: boolean;
  setIsGoingOut: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
  bgIsBlackFondateur: boolean;
  bgIsBlackFooter: boolean;
  setBgIsBlackFooter: React.Dispatch<React.SetStateAction<boolean>>;
  setBgIsBlackFondateur: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  headerHeight: "64px" | "128px" | "90px";
  setHeaderHeight: React.Dispatch<
    React.SetStateAction<"64px" | "128px" | "90px">
  >;
  langueCourante: LangueCode;
  setLangueCourante: React.Dispatch<React.SetStateAction<LangueCode>>;
  mediaPaths: MediaPaths;
  updateMediaPaths: () => void;
  pageIs: string;
  setPageIs: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValues: currentSectionProps = {
  handleScrollSections: () => { },
  homeRef: React.createRef<HTMLDivElement>(),
  cabinetRef: React.createRef<HTMLDivElement>(),
  expertiseRef: React.createRef<HTMLDivElement>(),
  visionRef: React.createRef<HTMLDivElement>(),
  fondateurRef: React.createRef<HTMLDivElement>(),
  carriereRef: React.createRef<HTMLDivElement>(),
  honoraireRef: React.createRef<HTMLDivElement>(),
  contactRef: React.createRef<HTMLDivElement>(),
  pageIs: "/",
  setPageIs: () => { },
  isHoveringExpertiseButton: "none",
  setIsHoveringExpertiseButton: () => { },
  isMobile: false,
  onVideos: false,
  setOnVideos: () => { },
  currentSection: 0,
  menuOpen: false,
  setMenuOpen: () => { },
  toggleMenu: () => { },
  goingOut: false,
  setIsGoingOut: () => { },
  bgIsBlackFondateur: false,
  bgIsBlackFooter: false,
  setBgIsBlackFooter: () => { },
  setBgIsBlackFondateur: () => { },
  setCurrentSection: () => { },
  headerHeight: "64px",
  setHeaderHeight: () => { },
  langueCourante: "FR",
  setLangueCourante: () => { },
  mediaPaths: {
    paris: `/videos/laptop/paris/paris_high.webm`,
    dubai: `/videos/laptop/dubai/dubai_high.webm`,
    qatar: `/videos/laptop/qatar/qatar_high.webm`,
    rio: `/videos/laptop/rio/rio_de_janeiro_high.webm`,
    newyork: `/videos/laptop/newyork/new-york_high.webm`,
    vosges: `/videos/laptop/vosges/vosges_high.webm`,
  },
  updateMediaPaths: () => { },
};

export const currentSectionContext = createContext<
  currentSectionProps | undefined
>(defaultValues);

export function useSection() {
  const context = useContext(currentSectionContext);
  if (!context)
    throw new Error("useSection must be used within a useSection.Provider");
  return context;
}

interface expertiseProps {
  subExpertise: "conseil" | "contentieux" | "affaires" | null;
  setSubExpertise: React.Dispatch<
    React.SetStateAction<"conseil" | "contentieux" | "affaires" | null>
  >;
}

export const expertiseContext = createContext<expertiseProps | undefined>(
  undefined
);

export function useExpertise() {
  const context = useContext(expertiseContext);
  if (!context)
    throw new Error("useExpertise must be used within a useExpertise.Provider");
  return context;
}
