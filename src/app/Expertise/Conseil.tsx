import { AnimatePresence } from "framer-motion";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import { useEffect, useRef, useState } from "react";
import ReversedArrow from "../assets/svg/reverseArrow";
import { motion } from "framer-motion";

export default function Conseil() {
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante, isMobile } = useSection();
  const { data } = useData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  useEffect(() => {}, [subExpertise]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!data) {
    return null;
  }
  // pareil ici langCodeMap creer un fichier global
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
  // meme chose ici
  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const { title, content } = data[langCode].section_3.box_1;
  // const formatContent = (content: string): string => {
  //   return (
  //     content
  //       .split(".")
  //       .filter((sentence) => sentence.trim() !== "")
  //       .join(".<br><br>") + "."
  //   );
  // };
  // const formattedContent = formatContent(content);
  /*
    ajouter la video de kaka avec une belle entree
  */
  if (typeof window !== "undefined") {
    return (
      <div
        className={`relative w-full h-full gap-[4vw] px-[15vw] flex justify-center items-center z-1 text-black`}
      >
        <div
          className="absolute top-[40%] left-[6%] w-[10%] h-[10%]"
          data-clickable={true}
          onClick={() => {
            setSubExpertise(null);
          }}
        >
          <ReversedArrow />
        </div>
        <div className="absolute top-[12%] text-[30px] sm:text-[40px] uppercase left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light">
          {title}
        </div>
        <p className="text-[16px] sm:text-[24px] items-center text-center -mt-[80px] max-w-[790px] font-light">
          {content}
        </p>
      </div>
    );
  }
}
