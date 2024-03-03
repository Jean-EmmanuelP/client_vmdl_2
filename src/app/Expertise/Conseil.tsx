import { AnimatePresence, motion } from "framer-motion";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import { useEffect, useRef, useState } from "react";

export default function Conseil() {
  const { subExpertise } = useExpertise();
  const { langueCourante } = useSection();
  const { data } = useData();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // check if it work
    console.log(`the push went well no error !`);
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
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
  const videoVariants = {
    hidden: { x: "50%" },
    visible: { x: "-110%" },
  };
  const formatContent = (content: string): string => {
    return (
      content
        .split(".")
        .filter((sentence) => sentence.trim() !== "")
        .join(".<br><br>") + "."
    );
  };
  const formattedContent = formatContent(content);

  if (typeof window !== "undefined") {
    return (
      <motion.div
        animate={{ x: subExpertise === "conseil" ? "0vw" : "100vw" }}
        style={{ y: "-100vh" }}
        transition={{ duration: 1 }}
        className={`absolute w-full ${isMobile ? "h-[110vh]" : "h-full"
          } flex text-noir bg-blanc`}
      >
        <div className={`relative hidden sm:block w-[30%] h-full`}>
          <video
            ref={videoRef}
            className={`object-cover w-full h-full transition duration-75 ${!isPlaying && "blur-lg"
              }`}
            onClick={togglePlay}
          >
            <source src="/videos/kaka.webm" type="video/webm" />
          </video>
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 ${isMobile ? "-mt-[64px]" : "-mt-[50px]"
                } -translate-y-1/2 w-16 h-16 bg-white rounded-full flex justify-center items-center`}
            >
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-black">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
        <div className="absolute right-0 w-full h-full sm:w-[70%] flex flex-col text-center">
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[65%] -translate-y-1/2 flex flex-col gap-2 justify-center items-center">
            <p className="text-[30px] sm:text-[60px] font-light uppercase">
              {title}
            </p>
            <p
              className="text-[16px] sm:text-[24px] sm:content"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            ></p>
          </div>
        </div>
        {isMobile && (
          <>
            <div className="absolute right-0 top-[45%] -translate-y-1/2 flex items-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={() => setVideoVisible(true)}
                onClick={() => setVideoVisible(!videoVisible)}
                className="z-10"
              >
                <img
                  src="https://media-public.canva.com/roFlA/MAFTn_roFlA/1/s-1.svg"
                  className="w-8 h-8 rotate-180 opacity-20 hover:opacity-100 transition duration-75"
                  alt=""
                />
              </motion.div>

              <AnimatePresence>
                {videoVisible && (
                  <motion.video
                    key="video"
                    variants={videoVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ type: "tween", duration: 0.2 }}
                    className="w-fit h-fit bg-blanc object-cover"
                    autoPlay={videoVisible}
                    loop
                    playsInline
                    poster="/images/paris.jpeg"
                    onHoverEnd={() => setVideoVisible(false)}
                  >
                    <source src="/videos/kaka.webm" type="video/webm" />
                    <source src="/videos/kaka.mp4" type="video/mp4" />
                  </motion.video>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    );
  }
}

