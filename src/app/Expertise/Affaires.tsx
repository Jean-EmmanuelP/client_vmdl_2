"use client";

import { LangueCode, useSection } from "../utils/Contextboard";
import { useEffect, useRef, useState } from "react";
import { useData } from "../utils/DataContext";
import ReversedArrow from "../assets/svg/reverseArrow";
import Image from "next/image";

interface Video {
  src: string;
  isActive: boolean;
  image: string;
  textAppearTime: number;
}

export default function Affaires() {
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const [playBackError, setPlaybackError] = useState<boolean>(false);
  const { mediaPaths, headerHeight } = useSection();

  const [videos, setVideos] = useState<Video[]>([
    {
      src: `${mediaPaths.qatar}`,
      isActive: false,
      image: "/images/qatar_phone.png",
      textAppearTime: 4,
    },
    {
      src: `${mediaPaths.newyork}`,
      isActive: false,
      image: "/images/ny_phone.png",
      textAppearTime: 10,
    },
    {
      src: `${mediaPaths.rio}`,
      isActive: true,
      image: "/images/rio_phone.png",
      textAppearTime: 8,
    },
  ]);
  const { data } = useData();
  const { langueCourante, isMobile } = useSection();
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
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
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
  const { qatar, rio, newyork } = data[langCode].section_3.box_3;

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

  function convertToMp4Path(webmPath: string) {
    return webmPath.replace(".webm", ".mp4");
  }

  return (
    <div
      className={`w-full h-full flex justify-center items-center text-blanc`}
    >
      <div
        className={`flex w-full h-full sm:w-full sm:h-full ${headerHeight === "64px"
          ? "-mt-[64px]"
          : headerHeight === "128px"
            ? "-mt-[128px]"
            : "-mt-[90px]"
          }`}
      >
        {videos &&
          videos.map((video, index) => {
            const { title, content } = video.src.includes("qatar") || video.image.includes("qatar") ? qatar : video.src.includes("newyork") || video.image.includes("newyork") ? newyork : rio;
            if (video.isActive) {
              return (
                <div
                  key={video.src}
                  className={`relative w-full h-full text-4xl ${video.isActive ? 'opacity-100' : 'opacity-0'} transition duration-100 ease-in-out`}
                >
                  {playBackError ? (
                    <>
                      <Image
                        src={video.image}
                        alt={title}
                        className="absolute w-full h-full object-cover"
                        layout="fill"
                      />
                      <div className="absolute p-4 top-[43%] left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-white sm:text-xl tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl font-light text-sm">
                        <p>{title}</p>
                        <p>{content}</p>
                      </div>
                    </>
                  ) : (
                    <video
                      className="flex justify-center items-center object-cover object-bottom h-full w-full"
                      ref={(el) => {
                        if (el) {
                          videoRefs.current[index] = el;
                        }
                      }}
                      playsInline
                      muted
                      preload="metadata"
                      onError={() => setPlaybackError(true)}
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
                </div>
              );
            }
          })}
      </div>
    </div >
  );
}
