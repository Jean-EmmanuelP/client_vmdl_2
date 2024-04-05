import { useEffect, useRef, useState } from "react";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function Contentieux() {
  const videoContentieuxRef = useRef<HTMLVideoElement | null>(null);
  const [textHere, setTextHere] = useState<boolean>(false);
  const { langueCourante, mediaPaths, headerHeight, isMobile } = useSection();
  const { subExpertise } = useExpertise();
  const { data } = useData();
  const [playBackError, setPlaybackError] = useState<boolean>(false);

  useEffect(() => {
    if (subExpertise === "contentieux") {
      videoContentieuxRef.current && videoContentieuxRef.current.play();
    } else {
      videoContentieuxRef.current && videoContentieuxRef.current.pause();
    }
  }, [subExpertise]);

  useEffect(() => {
    const videoElement = videoContentieuxRef.current;

    const handleTimeUpdate = () => {
      if (videoElement && videoElement.currentTime >= 10) {
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
  }, [videoContentieuxRef]);

  useEffect(() => {
    console.log(`this is the current value of playBackError: ${playBackError}`);
  }, [playBackError])
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
    return (
      content
        .split(".")
        .filter((sentence) => sentence.trim() !== "")
        .join(".<br><br>") + "."
    );
  };
  const formattedContent = formatContent(content);
  function convertToMp4Path(webmPath: string) {
    const webmToMp4 = webmPath.replace(".webm", ".mp4");
    return webmToMp4;
  }
  if (subExpertise === "contentieux") {
    return (
      <div
        className={`w-full bg-cover ${isMobile
            ? "bg-[url('/images/expertise/mobile/contentieux/vosges.jpeg')]"
            : "bg-[url('/images/expertise/laptop/contentieux/vosges.png')]"
          } h-full flex justify-center items-center text-noir ${subExpertise !== "contentieux" && "hidden"
          }`}
      >
        <div
          className={`absolute p-2 z-50 sm:p-10 sm:top-[47%] sm:left-[50%] -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2 justify-center items-center text-center sm:text-xl text-white tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl font-light text-sm`}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        ></div>
        <video
          ref={videoContentieuxRef}
          playsInline
          className={`w-full h-full sm:w-full sm:h-full object-cover ${headerHeight === "64px"
              ? "-mt-[64px]"
              : headerHeight === "128px"
                ? "-mt-[128px]"
                : "-mt-[90px]"
            }`}
          onError={() => setPlaybackError(true)}
        >
          <source
            src={`${convertToMp4Path(mediaPaths.vosges)}`}
            type="video/mp4"
          />
          <source src={`${mediaPaths.vosges}`} type="video/webm" />
        </video>
      </div>
    );
  } else {
    return null;
  }
}
