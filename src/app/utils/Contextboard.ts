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
  video: string;
  image: string;
}

interface currentSectionProps {
  currentSection: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  headerHeight: "64px" | "128px" | "90px";
  setHeaderHeight: React.Dispatch<
    React.SetStateAction<"64px" | "128px" | "90px">
  >;
  langueCourante: LangueCode;
  setLangueCourante: React.Dispatch<React.SetStateAction<LangueCode>>;
  mediaPaths: MediaPaths;
  updateMediaPaths: () => void;
}

const defaultValues: currentSectionProps = {
  currentSection: 0,
  setCurrentSection: () => {},
  headerHeight: "64px",
  setHeaderHeight: () => {},
  langueCourante: "FR",
  setLangueCourante: () => {},
  mediaPaths: {
    video: "/path/to/default/video.mp4",
    image: "/path/to/default/image.jpg",
  },
  updateMediaPaths: () => {},
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
