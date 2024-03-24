import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSection } from "../utils/Contextboard";

const BackgroundEiffel: React.FC = () => {
  const { mediaPaths, isMobile } = useSection();

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const isIOS = (): boolean => /iPad|iPhone|iPod/.test(navigator.userAgent);

  const convertToMp4Path = (webmPath: string): string =>
    webmPath.replace(".webm", ".mp4");

  useEffect(() => {
    const videoContainer = document.getElementById(
      "videoContainer"
    ) as HTMLDivElement | null;
    if (videoContainer) {
      const videoSource = isIOS()
        ? convertToMp4Path(mediaPaths.paris)
        : mediaPaths.paris;
      const videoType = isIOS() ? "video/mp4" : "video/webm";
      const posterPath = "/images/paris_2.JPG";
      const posterPathLaptop = "/images/paris.jpeg";

      const videoElement = document.createElement("video");
      videoElement.className = "video-js";
      videoElement.setAttribute("webkit-playsinline", "");
      videoElement.setAttribute("playsinline", "");
      videoElement.autoplay = true;
      videoElement.loop = true;
      videoElement.muted = true;
      if (isIOS()) {
        videoElement.poster = posterPath;
      }
      videoElement.style.cssText =
        "position: absolute; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; z-index: -1;";
      const sourceElement = document.createElement("source");
      sourceElement.src = videoSource;
      sourceElement.type = videoType;

      videoElement.appendChild(sourceElement);

      videoElement.onplay = () => {
        videoElement.style.display = "block";
      };
      videoElement.onerror = () => {
        videoElement.style.display = "none";
        if (!isIOS() && !isMobile) {
          videoContainer.style.backgroundImage = `url('${posterPathLaptop}')`;
        }
        videoContainer.style.backgroundSize = "cover";
        videoContainer.style.backgroundPosition = "center";
      };

      videoElement.play().catch(() => {
        videoElement.style.display = "none";
        videoContainer.style.backgroundImage = `url('${posterPath}')`;
        videoContainer.style.backgroundSize = "cover";
        videoContainer.style.backgroundPosition = "center";
      });

      videoContainer.innerHTML = "";
      videoContainer.appendChild(videoElement);
    }
  }, [mediaPaths.paris]);

  return (
    <AnimatePresence>
      {isIOS() ? (
        <div className="fixed inset-0 w-screen h-screen justify-center items-center z-[-1]">
          <img
            src="/images/pariseiffel.jpeg"
            className="w-screen h-screen object-cover blur-md"
            alt=""
          />
        </div>
      ) : (
        <motion.div
          key="background"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={videoVariants}
          transition={{ duration: 1 }}
          className="fixed top-0 w-full h-full justify-center items-center"
          style={{ zIndex: -1 }}
          id="videoContainer"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackgroundEiffel;
