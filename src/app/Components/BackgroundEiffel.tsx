import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../utils/Contextboard';

export default function BackgroundEiffel() {
  const { mediaPaths, setIsLoading } = useSection();

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  function isIOS() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }

  function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  useEffect(() => {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
      const videoSource = isIOS() || isMobile() ? convertToMp4Path(mediaPaths.paris) : mediaPaths.paris;
      const videoType = isIOS() || isMobile() ? 'video/mp4' : 'video/webm';

      const videoHtml = `
        <video class="video-js" playsinline autoplay loop muted onloadeddata="${() => setIsLoading(false)}" style="position: absolute; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; z-index: -1;">
          <source src="${videoSource}" type="${videoType}"/>
        </video>
      `;
      videoContainer.innerHTML = videoHtml;
    }
  }, [mediaPaths.paris]);

  function convertToMp4Path(webmPath: string) {
    return webmPath.replace('.webm', '.mp4');
  }

  return (
    <AnimatePresence>
      <motion.div
        key="background"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={videoVariants}
        transition={{ duration: 1 }}
        className="fixed top-0 w-full h-full justify-center items-center"
        style={{ zIndex: -1 }}
        id="videoContainer" // Adding an ID to target this div
      >
        {/* The video will be injected here via dangerouslySetInnerHTML */}
      </motion.div>
    </AnimatePresence>
  );
}
