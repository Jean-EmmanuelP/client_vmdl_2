import { motion, AnimatePresence } from "framer-motion";
import { useSection } from "../utils/Contextboard";
import { useEffect, useRef } from 'react';

export default function BackgroundEiffel() {
  const { mediaPaths, setIsLoading } = useSection();
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleVideoLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
  };

  function convertToMp4Path(webmPath: string): string {
    return webmPath.replace(".webm", ".mp4");
  }

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.src = convertToMp4Path(mediaPaths.paris);
      video.load();
    }
  }, [mediaPaths.paris]);

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
      >
        <video
          autoPlay
          loop
          muted
          onLoadedData={handleVideoLoad}
          playsInline
          poster="/images/paris_global_view.jpeg"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
            zIndex: -1,
          }}
          ref={videoRef} // Utilisez le ref typé ici
        >
          <source src={mediaPaths.paris} type="video/webm" />
          <source
            src={convertToMp4Path(mediaPaths.paris)}
            type="video/mp4"
          />
        </video>
      </motion.div>
    </AnimatePresence>
  );
}
