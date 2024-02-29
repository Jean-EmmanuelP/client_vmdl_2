"use client";

import { motion } from "framer-motion";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useEffect, useRef, useState } from "react";
import { useData } from "../utils/DataContext";
import ReversedArrow from "../assets/svg/reverseArrow";

interface Video {
  src: string;
  isActive: boolean;
  image: string;
  textAppearTime: number;
}

/* 
  enlever l'autoplay, contre productif, quand la personne regarde elle lit, ca disparait et ca repart
  - a 12 ca sarrete sur rio, la personne doit lire le texte
  - a 12 ca sarrete sur rio, la personne doit lire le texte
  - rajoute le cadre avec le texte
  - pour que la video redemarre au debut il faut que il change de page et revienne dessus
  - le boutton n'est pas ouf | c'est pas si evident que il faut cliquer, va pas avoir le reflexe de cliquer la et la
  peut etre quelque chose plus epure, plus simple et plus intuitif
  */
export default function Affaires() {
  const { subExpertise } = useExpertise();
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const { mediaPaths } = useSection();
  const [isIOS, setIsIOS] = useState<boolean>(false);
  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  const [videos, setVideos] = useState<Video[]>([
    {
      src: `${mediaPaths.qatar}`,
      isActive: false,
      image: "/images/qatar.jpeg",
      textAppearTime: 4,
    },
    {
      src: `${mediaPaths.dubai}`,
      isActive: false,
      image: "/images/dubai.jpeg",
      textAppearTime: 10,
    },
    {
      src: `${mediaPaths.rio}`,
      isActive: true,
      image: "/images/rio.jpeg",
      textAppearTime: 8,
    },
  ]);
  const { data } = useData();
  const { langueCourante } = useSection();
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [opacities, setOpacities] = useState(Array(3).fill(0));
  const opacitiesRef = useRef(opacities);
  opacitiesRef.current = opacities;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          const video = entry.target as HTMLVideoElement;

          const updateOpacity = async () => {
            const currentTime = video.currentTime;
            const videoData = videos[index];
            console.log(videoData);
            const newOpacities = [...opacitiesRef.current];
            newOpacities[index] =
              currentTime > videoData.textAppearTime ? 1 : 0;
            setOpacities(newOpacities);
          };

          if (entry.isIntersecting) {
            video
              .play()
              .then(() => {
                video.addEventListener("timeupdate", updateOpacity);
              })
              .catch((error) => {
                console.error("Error trying to play the video: ", error);
              });
          } else {
            video.currentTime = 0;
            video.removeEventListener("timeupdate", updateOpacity);
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video, index) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video, index) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);
  useEffect(() => {
    videos.forEach((video, index) => {
      if (!video.isActive && videoRefs.current[index]) {
        const videoElement = videoRefs.current[index];
        videoElement.currentTime = 0;
        videoElement.pause();
      }
    });
  }, [videos]);
  useEffect(() => {
    if (autoScroll) {
      const timer = setTimeout(() => {
        setAutoScroll(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoScroll]);
  if (!data) {
    return;
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
  const { qatar, rio, dubai } = data[langCode].section_3.box_3;

  const handleSelection = (direction: number) => {
    if (!autoScroll) {
      setAutoScroll(true);
      const currentIndex = videos.findIndex((video) => video.isActive);
      let nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        nextIndex = videos.length - 1;
      } else if (nextIndex >= videos.length) {
        nextIndex = 0;
      }

      const newVideos = videos.map((video, index) => {
        const isActive = index === nextIndex;
        if (!isActive && videoRefs.current[index]) {
          videoRefs.current[index].currentTime = 0;
          videoRefs.current[index].pause();
        }
        return { ...video, isActive };
      });

      setVideos(newVideos);
      setTimeout(() => setAutoScroll(false), 500);
    }
  };

  const isMobile = window.innerWidth <= 768;

  function convertToMp4Path(webmPath: string) {
    return webmPath.replace(".webm", ".mp4");
  }
  return (
    <motion.div
      animate={{ x: subExpertise === "affaires" ? "100vw" : "200vw" }}
      style={{ y: "-100vh" }}
      transition={{ duration: 1 }}
      className={`relative w-full ${
        isMobile ? "h-[110vh]" : "h-full"
      } flex justify-center items-center text-blanc z-1 bg-blanc`}
    >
      <div className="absolute flex w-[300%] h-full overflow-hidden z-10 bg-blanc">
        {videos &&
          videos.map((video, index) => {
            let title, content;
            if (video.src.includes("qatar") || video.image.includes("qatar")) {
              title = qatar.title;
              content = qatar.content;
              console.log(qatar.title, qatar.content);
            } else if (
              video.src.includes("dubai") ||
              video.image.includes("dubai")
            ) {
              title = dubai.title;
              content = dubai.content;
            } else if (
              video.src.includes("rio") ||
              video.image.includes("rio")
            ) {
              title = rio.title;
              content = rio.content;
            }
            return (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{
                  opacity: video.isActive ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                key={video.src}
                className={`absolute w-1/3 h-full text-4xl`}
              >
                {isIOS ? (
                  <>
                    <img
                      src={video.image}
                      alt={title}
                      className="absolute w-full h-full object-cover -translate-y-1/2"
                    />
                    <div className="absolute p-4 top-[43%] left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white sm:text-xl tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl font-light text-sm">
                      <p>{title}</p>
                      <p>{content}</p>
                    </div>
                  </>
                ) : (
                  <video
                    className="absolute flex justify-center items-center object-cover h-full w-full -translate-y-1/2"
                    ref={(el) => {
                      if (el) {
                        videoRefs.current[index] = el;
                      }
                    }}
                    playsInline
                    muted
                  >
                    <source src={`${video.src}`} type="video/webm" />
                    <source
                      src={`${convertToMp4Path(video.src)}`}
                      type="video/mp4"
                    />
                  </video>
                )}

                <div
                  style={{ opacity: opacities[index] }}
                  className={`transition duration-150 text-white text-[18px] tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl p-10 w-fit absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 flex-col items-center justify-center`}
                >
                  <p>{title}</p>
                  <p>{content}</p>
                </div>
                <div
                  className="absolute flex transition duration-100 hover:scale-105 justify-center items-center left-2 top-[40%] bg-white/50 backdrop-blur-sm shadow-2xl z-10 p-2 sm:p-4"
                  data-clickable={"true"}
                  onClick={() => handleSelection(-1)}
                >
                  <ReversedArrow lilArrow={true} isGrey={true} />
                </div>
                <div
                  className="absolute flex justify-center transition duration-100 hover:scale-105 items-center right-2 top-[40%] bg-white/50 backdrop-blur-sm shadow-2xl z-10 p-2 sm:p-4"
                  data-clickable={"true"}
                  onClick={() => handleSelection(1)}
                >
                  <div className="scale-x-[-1]">
                    <ReversedArrow lilArrow={true} isGrey={true} />
                  </div>
                </div>
              </motion.button>
            );
          })}
      </div>
    </motion.div>
  );
}
