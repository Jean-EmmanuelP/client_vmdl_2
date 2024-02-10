"use client";

import { PanInfo, motion } from "framer-motion";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useData } from "../utils/DataContext";
import Paragraph from "../Components/Paragraph";

const videoPosition = [-window.innerWidth, 0, window.innerWidth];
interface Video {
  src: string;
  idx: number;
  side: "left" | "right";
  title: string;
  subtitle: string;
  contact_button: string;
}

export default function Affaires() {
  const { subExpertise } = useExpertise();
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([
    {
      src: "/videos/qatar.mp4", idx: 1, side: "right", title: "Titre de la vidéo Qatar",
      subtitle: "Sous-titre de la vidéo Qatar",
      contact_button: "Contacter pour Qatar"
    },
    {
      src: "/videos/dubai.mp4", idx: 2, side: "right", title: "Titre de la vidéo Dubai",
      subtitle: "Sous-titre de la vidéo Dubai",
      contact_button: "Contacter pour Dubai"
    },
    {
      src: "/videos/rio_de_janeiro.mp4", idx: 0, side: "right", title: "Titre de la vidéo Rio",
      subtitle: "Sous-titre de la vidéo Rio",
      contact_button: "Contacter pour Rio"
    },
  ]);
  const { data } = useData();
  const { langueCourante } = useSection();
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Intersection Observer pour jouer/pauser les vidéos basées sur la visibilité
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
    videoRefs.current = videoRefs.current.slice(0, videos.length); // Gardez les références synchronisées avec les vidéos actuelles

    videoRefs.current.forEach((video) => video && observer.observe(video));

    return () => videoRefs.current.forEach((video) => video && observer.unobserve(video));
  }, [videos]);
  useEffect(() => {
    if (autoScroll) {
      const timer = setTimeout(() => {
        setAutoScroll(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoScroll]);

  useEffect(() => {
    for (const vid of videos) {
      if (vid.idx === -1) {
        console.log("SWAP");
        setAutoScroll(true);

        const newVideos = videos.map((video) => {
          video.idx = video.idx + 1;
          return video;
        });
        setVideos(newVideos);
      }
    }
  }, [videos]);
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

  const changeVideo = (direction: string) => {
    if (!autoScroll) {
      setAutoScroll(true);
      let newVideos;
      if (direction === "right") {
        newVideos = videos.map((video) => {
          const newIndex = video.idx - 1 >= 0 ? video.idx - 1 : videos.length - 1;
          return { ...video, idx: newIndex, side: "right" as const };
        });
      } else {
        newVideos = videos.map((video) => {
          const newIndex = video.idx + 1 < videos.length ? video.idx + 1 : 0;
          return { ...video, idx: newIndex, side: "left" as const };
        });
      }
      setVideos(newVideos);
      setTimeout(() => setAutoScroll(false), 500);
    }
  };

  const handleVideoEnd = (
    event: React.SyntheticEvent<HTMLVideoElement>,
    index: number
  ) => {
    if (subExpertise === "affaires" && index === 0) {
      event.currentTarget.currentTime = 0;
      event.currentTarget.play();
    }
  };

  return (
    <motion.div
      animate={{ x: subExpertise === "affaires" ? "100vw" : "200vw" }}
      style={{ y: "-100vh" }}
      transition={{ duration: 1 }}
      className="relative w-full h-full flex justify-center items-center text-blanc z-1 bg-blanc"
    >
      <motion.div
        drag={autoScroll ? false : "x"}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{ left: 0, right: 0 }}
        className="absolute flex w-[300%] h-full overflow-hidden z-10 bg-blanc"
        initial={{ x: 0 }}
      >
        {videos &&
          videos.map((video, index) => {
            let title, content;
            // Déterminer le titre et le contenu en fonction de la source de la vidéo
            if (video.src.includes('qatar')) {
              title = qatar.title;
              content = qatar.content;
            } else if (video.src.includes('dubai')) {
              title = dubai.title;
              content = dubai.content;
            } else if (video.src.includes('rio')) {
              title = rio.title;
              content = rio.content;
            }
            return (
              <motion.button
                initial={{ x: videoPosition[index] + "px" }}
                animate={{ x: videoPosition[video.idx] + "px" }}
                transition={{ duration: .5 }}
                key={video.src}
                className={`absolute w-1/3 h-full text-4xl ${video.side === "right"
                  ? video.idx === 2
                    ? "opacity-0"
                    : ""
                  : video.idx === -1
                    ? "opacity-0"
                    : ""
                  }`}
              >
                <video
                  className="absolute flex justify-center items-center object-cover h-full w-full -translate-y-1/2"
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[index] = el;
                    }
                  }}
                  src={video.src}
                  muted
                  onEnded={(e) => handleVideoEnd(e, video.idx)}
                ></video>
                <div className="text-white tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl p-2 sm:p-4 w-fit absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 flex-col items-center justify-center">
                  <p>
                    {title}
                  </p>
                  <p>
                    {content}
                  </p>
                </div>
              </motion.button>
            );
          })}
      </motion.div>
      <motion.button
        style={{ x: "-100vw" }}
        animate={{ scale: autoScroll ? 1 : 1.5 }}
        transition={{ duration: 0.1 }}
        onClick={() => changeVideo("right")}
        className="absolute right-[10%] text-3xl z-10 animation-spin"
        data-clickable="true"
      >
        <BiSolidRightArrow />
      </motion.button>
    </motion.div>
  );
}
