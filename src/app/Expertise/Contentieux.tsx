import { LangueCode, useSection } from "../utils/Contextboard";
import { useEffect, useRef, useState } from "react";
import { useData } from "../utils/DataContext";
import Image from "next/image";

export default function Contentieux() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [textHere, setTextHere] = useState<boolean>(false);
  const { langueCourante, mediaPaths, headerHeight, isMobile } = useSection();
  const { data } = useData();
  const [playBackError, setPlaybackError] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
          setTextHere(false);
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
        setTextHere(true);
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

  return (
    <div className={`w-full h-full flex justify-center items-center text-noir`}>
      <div
        className={`${textHere && !playBackError ? 'opacity-100' : 'opacity-0'} ${playBackError && 'opacity-100'} transition duration-300 ease-in-out`}
      >
        <div
          className={`p-2 z-50 sm:p-10 absolute sm:top-[47%] sm:left-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2 justify-center items-center text-center sm:text-xl text-white tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl font-light text-sm`}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        ></div>
      </div>
      {
        playBackError ?
          (
            <Image
              className={`object-cover -full h-full`}
              src={`${isMobile ? '/images/expertise/mobile/contentieux/vosges.jpeg' : '/images/expertise/laptop/contentieux/vosges.png'}`}
              alt="vosges_phone"
              layout="fill"
            />
          )
          :
          (
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
            >
              <source src={`${mediaPaths.vosges}`} type="video/webm" />
              <source
                src={`${convertToMp4Path(mediaPaths.vosges)}`}
                type="video/mp4"
              />
            </video>
          )
      }
    </div>
  );
}
