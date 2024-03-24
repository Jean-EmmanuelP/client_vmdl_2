import { AnimatePresence } from "framer-motion";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import { useEffect, useRef, useState } from "react";
import ReversedArrow from "../assets/svg/reverseArrow";

export default function Conseil() {
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante, isMobile } = useSection();
  const { data } = useData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (showVideo) {
      console.log(`video will be playing`);
      videoRef.current?.play();
    } else {
      console.log(`video will be paused`);
      videoRef.current?.pause();
    }
  }, [showVideo]);

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
  useEffect(() => { }, [subExpertise]);

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
  return (
    <div
      className={`relative w-full h-full gap-[4vw] px-[15vw] justify-center items-center flex flex-col sm:flex-row z-10 text-black`}
    >
      <div
        className="absolute top-[10%] bg-blanc sm:top-[0%] left-[10%] sm:left-[0%] w-[50px] h-[50px] sm:w-[5%] sm:h-[8%] flex items-center justify-center pr-2"
        data-clickable={true}
        onClick={() => {
          setSubExpertise(null);
        }}
      >
        <ReversedArrow />
      </div>
      {isMobile ?
        (
          <>
            <div className="absolute top-[30%] sm:top-[12%] text-[20px] sm:text-[30px] uppercase left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light">
              {title}
            </div>
            <p className="text-left text-[16px] sm:text-[24px] items-center -mt-[80px] max-w-[790px] font-light">
              {content}
            </p>
          </>
        )
        :
        (
          <>
            <div className="relative w-1/2 h-full object-contain">
              <video className="w-full h-full" autoPlay loop muted>
                <source src="/videos/kaka.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="relative sm:w-1/2 h-full flex flex-col justify-center items-center">
              <div className="absolute top-[30%] sm:top-[12%] text-[20px] sm:text-[30px] uppercase left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light">
                {title}
              </div>
              <p className="text-left text-[16px] sm:text-[24px] items-center -mt-[80px] max-w-[790px] font-light">
                {content}
              </p>
            </div>
          </>
        )
      }

      {isMobile && (
        <>
          <div
            onClick={() => setShowVideo(!showVideo)}
            className={`absolute font-light text-sm py-2 px-4 rounded-md flex flex-col cursor-pointer transition-top ${showVideo ? "top-[83%]" : "top-[78%]"
              }`}
          >
            <div className="transform rotate-90">
              <ReversedArrow />
            </div>
            <p className={`-mt-6 transition-opacity duration-700 ease-in-out`}>
              {!showVideo ? "See highlight" : "Hide hightlight"}
            </p>
          </div>

          <div
            onClick={() => setShowVideo(false)}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${showVideo ? "opacity-100" : "opacity-0 hidden"
              } z-50`}
          >
            <video className="w-full h-full" autoPlay ref={videoRef}>
              <source src="/videos/kaka.mp4" type="video/mp4" />
            </video>
          </div>
        </>
      )}
    </div>
  );
}
