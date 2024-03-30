import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useData } from "../utils/DataContext";
import ReversedArrow from "../assets/svg/reverseArrow";

export default function Contentieux() {
  const { setSubExpertise } = useExpertise();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [textOpacity, setTextOpacity] = useState(0);
  const { langueCourante, mediaPaths, headerHeight } = useSection();
  const { data } = useData();
  const [playBackError, setPlaybackError] = useState<boolean>(false);
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
  // creer un fichier global pour le langCodeMap
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
  // creer un fichier global pour le langCode
  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const { content } = data[langCode].section_3.box_2;
  const formatContent = (content: string): string => {
    return (
      content
        .split(".")
        .filter((sentence) => sentence.trim() !== "")
        .join(".<br><br>") + "."
    );
  };
  const formattedContent = formatContent(content);
  function convertToMp4Path(webmPath: string) {
    return webmPath.replace(".webm", ".mp4");
  }
  const isIOS = (): boolean => /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className={`w-full h-full flex justify-center items-center text-noir`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: textOpacity }}
        transition={{ delay: 12, duration: 0.3 }}
      >
        <div
          className={`p-2 z-50 sm:p-10 absolute sm:top-[47%] sm:left-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2 justify-center items-center text-center sm:text-xl text-white tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl font-light text-sm`}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        ></div>
      </motion.div>
      <video
        ref={videoRef}
        playsInline
        className={`w-full h-full sm:w-full sm:h-full object-cover ${headerHeight === "64px"
          ? "-mt-[64px]"
          : headerHeight === "128px"
            ? "-mt-[128px]"
            : "-mt-[90px]"
          }`}
        onError={() => setPlaybackError(true)}
        {...(isIOS() && playBackError && { poster: `/images/vosges_phone.png` })}
      >
        <source src={`${mediaPaths.vosges}`} type="video/webm" />
        <source
          src={`${convertToMp4Path(mediaPaths.vosges)}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
