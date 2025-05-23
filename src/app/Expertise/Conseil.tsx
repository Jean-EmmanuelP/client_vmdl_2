import { useEffect, useRef, useState } from "react";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import { formatContent } from "../utils/utils";

export default function Conseil() {
  const { subExpertise } = useExpertise();
  const { langueCourante, isMobile } = useSection();
  const { data } = useData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoLaptopKaka = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPaused, setVideoPaused] = useState<boolean>(false);
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
    if (subExpertise === "conseil") {
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
    }
  }, []);
  useEffect(() => {
    subExpertise === null && setShowVideo(false);
    setVideoPaused(true);
  }, [subExpertise]);

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
  if (subExpertise === "conseil") {
    return (
      <div
        className={`relative w-full h-full gap-[4vw] sm:gap-0 px-[15vw] sm:px-0 justify-center items-center sm:justify-start sm:items-start flex flex-col sm:flex-row z-10 text-black`}
      >
        {isMobile ? (
          <>
            <div className="text-[20px] uppercase font-light">
              {title}
            </div>
            <p className="text-justify text-[12px] max-w-[790px] font-light">
              {formatContent(content)}
            </p>
          </>
        ) : (
          <>
            <div
              className="group relative w-1/2 overflow-hidden h-full"
              onClick={() => {
                if (!videoPaused) {
                  videoLaptopKaka.current?.pause();
                  setVideoPaused(true);
                } else {
                  videoLaptopKaka.current?.play();
                  setVideoPaused(false);
                }
              }}
            >
              <div
                className={`${!videoPaused ? "opacity-0" : "opacity-100"
                  } group-hover:scale-150 group-hover:text-red-500 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full h-20 w-20 z-20`}
              >
                <div className="sm:w-[100px] sm:h-[80px] bg-blanc flex items-center justify-center rounded-full">
                  ▶
                </div>
              </div>
              <video
                className={`w-full h-full transition duration-75 ${!videoPaused ? "" : "blur-md grayscale"
                  } group-hover:blur-0 group-hover:grayscale-0`}
                loop
                ref={videoLaptopKaka}
              >
                <source src="/videos/kaka.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="relative sm:w-fit h-full flex flex-col justify-center items-center">
              <div className="absolute text-justify w-[90%] top-[30%] sm:top-[25%] text-[20px] sm:text-[30px] uppercase left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light">
                {title}
              </div>
              <p className="text-justify  text-[12px] w-[90%] sm:text-[24px] items-center -mt-[80px] max-w-[790px] font-light">
                {formatContent(content)}
              </p>
            </div>
          </>
        )}

        {/* {isMobile && (
          <>
            <div
              onClick={() => setShowVideo(!showVideo)}
              className={`absolute font-light text-sm py-2 px-4 flex flex-col cursor-pointer transition-top ${showVideo ? "top-[70%]" : "top-[60%]"
                } translate-y-1/2`}
            >
              <p
                className={`p-2 rounded-md shadow-md bg-gray-700 text-blanc font-semibold transition-opacity duration-700 ease-in-out`}
              >
                {!showVideo ? "Play video" : "Hide"}
              </p>
            </div>

            <div
              onClick={() => setShowVideo(false)}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${showVideo ? "opacity-100" : "opacity-0 hidden"
                } z-50`}
            >
              <video className="w-full h-full" ref={videoRef}>
                <source src="/videos/kaka.mp4" type="video/mp4" />
              </video>
            </div>
          </>
        )} */}
      </div>
    );
  } else {
    return null;
  }
}
