import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

// Assurez-vous que LangueCode est correctement importé ou défini quelque part dans votre projet
type LangueCode = "FR" | "EN" | "IT" | "ES" | "عربي" | "PT" | "DE" | "中文";

export default function Contentieux() {
  const { subExpertise } = useExpertise();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [textOpacity, setTextOpacity] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const { langueCourante, mediaPaths } = useSection();
  const { data } = useData();
  const isMobile = window.innerWidth <= 768;

  const isIOS = (): boolean => /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const handleVideoError = () => setVideoError(true);
    const videoCurrent = videoRef.current;
    if (videoCurrent) {
      videoCurrent.addEventListener("error", handleVideoError);
    }
    return () => {
      if (videoCurrent) {
        videoCurrent.removeEventListener("error", handleVideoError);
      }
    };
  }, []);

  if (!data) return null;

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

  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const { content } = data[langCode]?.section_3?.box_2 || { content: "" };

  const formatContent = (content: string): string => {
    return (
      content
        .split(".")
        .filter((sentence) => sentence.trim() !== "")
        .join(".<br><br>") + "."
    );
  };

  const formattedContent = formatContent(content);

  return (
    <motion.div
      animate={{ x: subExpertise === "contentieux" ? "0vw" : "100vw" }}
      style={{ y: "-100vh" }}
      transition={{ duration: 1 }}
      className={`absolute w-full overflow-hidden ${
        isMobile ? "h-[110vh]" : "h-full"
      } flex justify-center items-center text-blanc`}
    >
      {isIOS() && videoError ? (
        <div
          className="w-full h-full bg-center bg-cover flex justify-center items-center"
          style={{
            backgroundImage: `url(${mediaPaths.vosges.replace(
              ".webm",
              ".jpeg"
            )})`,
          }} // Remplacer .webm par .jpeg pour le poster
        >
          <div
            className="p-2 sm:p-10 flex flex-col gap-2 justify-center items-center text-center sm:text-xl text-white tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl font-light text-sm"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          ></div>
        </div>
      ) : (
        <video
          ref={videoRef}
          playsInline
          className="w-full h-full object-cover bg-black"
          poster={mediaPaths.vosges.replace(".webm", ".jpeg")} // Utiliser le poster pour tous les cas
        >
          <source src={mediaPaths.vosges} type="video/webm" />
          <source
            src={mediaPaths.vosges.replace(".webm", ".mp4")}
            type="video/mp4"
          />
        </video>
      )}
    </motion.div>
  );
}
