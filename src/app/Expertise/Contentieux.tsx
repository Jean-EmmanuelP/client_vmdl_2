import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useData } from "../utils/DataContext";

export default function Contentieux() {
  const { subExpertise } = useExpertise();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [textOpacity, setTextOpacity] = useState(0);
  const { langueCourante, mediaPaths } = useSection();
  const { data } = useData();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setTextOpacity(1);
        } else {
          videoRef.current?.pause();
          setTextOpacity(0);
        }
      },
      { threshold: 0.5 }
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
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoElement && videoElement.currentTime >= 12) {
        setTextOpacity(1);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoRef]);
  if (!data) {
    return null;
  }

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
  const { content } = data[langCode].section_3.box_2;

  const formatContent = (content: string): string => {
    // Diviser le contenu à chaque point, puis rejoindre les éléments avec un '<br>' pour un saut de ligne HTML
    return (
      content
        .split(".")
        .filter((sentence) => sentence.trim() !== "")
        .join(".<br><br>") + "."
    );
  };
  const formattedContent = formatContent(content);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  return (
    <motion.div
      animate={{ x: subExpertise === "contentieux" ? "0vw" : "100vw" }}
      style={{ y: isMobile ? "-30vh" : "-100vh" }}
      transition={{ duration: 1 }}
      className="absolute w-full overflow-hidden h-full flex justify-center items-center text-blanc"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: textOpacity }}
        transition={{ delay: 12, duration: 0.3 }}
        className="z-10"
      >
        <div
          className="p-2 sm:p-10 absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2 justify-center items-center text-center sm:text-xl text-white tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl font-light text-sm"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        ></div>
      </motion.div>

      <video ref={videoRef} className="w-full h-full object-cover bg-black">
        <source src={`${mediaPaths.vosges}`} type="video/mp4" />
      </video>
    </motion.div>
  );
}
