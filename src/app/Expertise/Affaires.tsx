"use client";

import { PanInfo, motion } from "framer-motion";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useData } from "../utils/DataContext";

const videoPosition = [-window.innerWidth, 0, window.innerWidth];

export default function Affaires() {
  const { subExpertise } = useExpertise();
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const [videos, setVideos] = useState([
    { src: "/videos/qatar.mp4", idx: 1, side: "right" },
    { src: "/videos/dubai.mp4", idx: 2, side: "right" },
    { src: "/videos/rio_de_janeiro.mp4", idx: 0, side: "right" },
  ]);
  const { data } = useData();
  const { langueCourante } = useSection();
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

        console.log("old: ", videos);
        const newVideos = videos.map((video) => {
          video.idx = video.idx + 1;
          return video;
        });
        console.log("new: ", newVideos);
        setVideos(newVideos);
      }
    }
  }, [videos]);
  if (!data) {
    return;
  }
  const langCodeMap: { [key in LangueCode]: string } = {
    FR: 'fr',
    EN: 'en',
    IT: 'it',
    ES: 'es',
    عربي: 'عربي',
    PT: 'pt',
    DE: 'de',
	中文: '中文'
  };
  const langCode = langCodeMap[langueCourante as LangueCode] || langCodeMap['FR'];
  const { title, content } = data[langCode].section_3.box_3;
  

  const changeVideo = (direction: string) => {
    /*if (direction === "left") {
			console.log("left")
			// Déplace le premier élément à la fin du tableau
			setVideos(prev => [...prev.slice(1), prev[0]]);
		} else {
			// Déplace le dernier élément au début du tableau
			console.log("left")
			setVideos(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
		}*/

    if (direction === "right" && !autoScroll) {
      setAutoScroll(true);

      const newVideos = videos.map((video) => {
        video.idx = video.idx - 1 > -1 ? video.idx - 1 : 2;
        video.side = "right";
        return video;
      });
      setVideos(newVideos);
    } else if (direction === "left" && !autoScroll) {
      setAutoScroll(true);

      const newVideos = videos.map((video) => {
        if (video.idx === 2) video.idx = -1;
        video.side = "left";
        return video;
      });
      setVideos(newVideos);
    }
  };

  const handleEndDrag = (info: PanInfo) => {
    if (info.offset.x < 0) {
      setAutoScroll(true);

      const newVideos = videos.map((video) => {
        video.idx = video.idx - 1 > -1 ? video.idx - 1 : 2;
        return video;
      });
      setVideos(newVideos);
    } else {
      setAutoScroll(true);

      const newVideos = videos.map((video) => {
        video.idx = video.idx + 1 < 3 ? video.idx + 1 : 0;
        return video;
      });
      setVideos(newVideos);
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
      className="absolute w-full h-full flex justify-center items-center text-blanc z-1 bg-blanc"
    >
      <motion.div
        drag={autoScroll ? false : "x"}
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(e, i) => {e; handleEndDrag(i)}}
        dragConstraints={{ left: 0, right: 0 }}
        className="absolute flex w-[300%] h-full overflow-hidden z-10 bg-blanc"
        initial={{ x: 0 }}
        transition={{
          duration: subExpertise === "affaires" ? (autoScroll ? 0.5 : 0) : 0.5,
        }}
        onClick={() => console.log("PARENT CLICKED")}
      >
        {videos &&
          videos.map((video, index) => {
            return (
              <motion.button
                initial={{ x: videoPosition[index] + "px" }}
                animate={{ x: videoPosition[video.idx] + "px" }}
                transition={{ duration: 1 }}
                style={{ y: "-50vh" }}
                key={video.src}
                onClick={() => console.log(`${index} clicked`)}
                className={`absolute w-1/3 h-full text-4xl ${
                  video.side === "right"
                    ? video.idx === 2
                      ? "opacity-0"
                      : ""
                    : video.idx === -1
                    ? "opacity-0"
                    : ""
                }`}
              >
                <video
                  className="justify-center items-center object-cover h-full w-full"
                  src={video.src}
                  autoPlay
                  muted
                  onEnded={(e) => handleVideoEnd(e, video.idx)}
                ></video>
              </motion.button>
            );
          })}
      </motion.div>

      <motion.button
        style={{ x: "-100vw" }}
        animate={{ scale: autoScroll ? 1 : 1.5 }}
        transition={{ duration: 0.5 }}
        onClick={() => changeVideo("left")}
        className="absolute left-[10%] text-3xl z-10 animation-spin"
        data-clickable="true"
      >
        <BiSolidLeftArrow />
      </motion.button>

      <motion.button
        style={{ x: "-100vw" }}
        animate={{ scale: autoScroll ? 1 : 1.5 }}
        transition={{ duration: 0.5 }}
        onClick={() => changeVideo("right")}
        className="absolute right-[10%] text-3xl z-10 animation-spin"
        data-clickable="true"
      >
        <BiSolidRightArrow />
      </motion.button>
    </motion.div>
  );
}
