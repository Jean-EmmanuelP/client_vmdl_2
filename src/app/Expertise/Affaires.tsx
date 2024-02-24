"use client";

import { motion } from "framer-motion";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useEffect, useRef, useState } from "react";
import { useData } from "../utils/DataContext";

const videoPosition = [-window.innerWidth, 0, window.innerWidth];
interface Video {
  src: string;
  isActive: boolean;
  title: string;
  subtitle: string;
  contact_button: string;
  image: string;
}

export default function Affaires() {
  const { subExpertise } = useExpertise();
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const { mediaPaths } = useSection();

  const [videos, setVideos] = useState<Video[]>([
    {
      src: `${mediaPaths.qatar}`,
      isActive: false,
      title: "Titre de la vidéo Qatar",
      subtitle: "Sous-titre de la vidéo Qatar",
      contact_button: "Contacter pour Qatar",
      image: "qatar.jpeg",
    },
    {
      src: `${mediaPaths.dubai}`,
      isActive: false,
      title: "Titre de la vidéo Dubai",
      subtitle: "Sous-titre de la vidéo Dubai",
      contact_button: "Contacter pour Dubai",
      image: "dubai.jpeg",
    },
    {
      src: `${mediaPaths.rio}`,
      isActive: true,
      title: "Titre de la vidéo Rio",
      subtitle: "Sous-titre de la vidéo Rio",
      contact_button: "Contacter pour Rio",
      image: "rio.jpeg",
    },
  ]);
  const { data } = useData();
  const { langueCourante } = useSection();
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.error("Error trying to play the video: ", error);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    videoRefs.current = videoRefs.current.slice(0, videos.length);

    videoRefs.current.forEach((video) => video && observer.observe(video));

    return () =>
      videoRefs.current.forEach((video) => video && observer.unobserve(video));
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

  const handleSelection = (selectedId: string) => {
    if (!autoScroll) {
      setAutoScroll(true);
      const newVideos = videos.map((video) => {
        if (video.src.includes(selectedId)) {
          return { ...video, isActive: true };
        } else {
          return { ...video, isActive: false };
        }
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
      className={`relative w-full ${isMobile ? "h-[110vh]" : "h-full"
        } flex justify-center items-center text-blanc z-1 bg-blanc`}
    >
      <div className="absolute flex w-[300%] h-full overflow-hidden z-10 bg-blanc">
        {videos &&
          videos.map((video, index) => {
            let title, content;
            if (video.src.includes("qatar")) {
              title = qatar.title;
              content = qatar.content;
            } else if (video.src.includes("dubai")) {
              title = dubai.title;
              content = dubai.content;
            } else if (video.src.includes("rio")) {
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
                <video
                  className="absolute flex justify-center items-center object-cover h-full w-full -translate-y-1/2"
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[index] = el;
                    }
                  }}
                  playsInline
                  muted
                // poster={`/images/${video.image}`}
                >
                  <source src={`${video.src}`} type="video/webm" />
                  <source
                    src={`${convertToMp4Path(video.src)}`}
                    type="video/mp4"
                  />
                </video>
                <div className="text-white tracking-wide bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl p-10 w-fit absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 flex-col items-center justify-center">
                  <p>{title}</p>
                  <p>{content}</p>
                </div>
              </motion.button>
            );
          })}
        <div className="absolute flex justify-around items-center bottom-20 left-1/2 translate-x-[-125.5vw] sm:translate-x-[-106.5vw] w-60 h-10 bg-white/10 backdrop-blur-sm shadow-2xl rounded-2xl">
          <div
            className={`relative rounded-full border border-black/50  shadow-2xl w-5 h-5 sm:w-6 sm:h-6 bg-white`}
            data-clickable="true"
            id="rio"
            onClick={() => handleSelection("rio")}
          >
            <div
              className={`${videos[2].isActive &&
                `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-1/2 h-1/2 rounded-full`
                }`}
            ></div>
          </div>
          <div
            className={`relative rounded-full border border-black/50  shadow-2xl w-5 h-5 sm:w-6 sm:h-6 bg-white`}
            data-clickable="true"
            id="dubai"
            onClick={() => handleSelection("dubai")}
          >
            <div
              className={`${videos[1].isActive &&
                `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-1/2 h-1/2 rounded-full`
                }`}
            ></div>
          </div>
          <div
            className={`relative rounded-full border border-black/50  shadow-2xl w-5 h-5 sm:w-6 sm:h-6 bg-white`}
            data-clickable="true"
            id="qatar"
            onClick={() => handleSelection("qatar")}
          >
            <div
              className={`${videos[0].isActive &&
                `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black w-1/2 h-1/2 rounded-full`
                }`}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
