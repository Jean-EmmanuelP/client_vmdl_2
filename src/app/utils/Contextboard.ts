import { createContext, useContext } from "react";

export type LangueCode =
  | "FR"
  | "EN"
  | "IT"
  | "ES"
  | "عربي"
  | "PT"
  | "DE"
  | "中文";

interface MediaPaths {
  paris: string;
  dubai: string;
  qatar: string;
  rio: string;
  vosges: string;
}

interface currentSectionProps {
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValues: currentSectionProps = {
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
    paris: `/videos/laptop/paris/paris_low.webm`,
    dubai: `/videos/laptop/dubai/dubai_low.webm`,
    qatar: `/videos/laptop/qatar/qatar_low.webm`,
    rio: `/videos/laptop/rio/rio_de_janeiro_low.webm`,
    vosges: `/videos/laptop/vosges/vosges_low.webm`,
  },
  updateMediaPaths: () => { },
  setIsLoading: () => { }
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
