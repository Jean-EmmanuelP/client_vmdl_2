import { motion, AnimatePresence } from "framer-motion";
import { useExpertise, useSection } from "../utils/Contextboard";
import { useEffect, useRef, useState } from "react";

export default function BackgroundEiffel() {
  const { subExpertise } = useExpertise();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { mediaPaths } = useSection();

  useEffect(() => {
    setIsVideoLoaded(false);
    console.log(`voici le mediaPath en fonction de la connexion:`, mediaPaths);
  }, [subExpertise, mediaPaths]);

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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
        {!isVideoLoaded && (
          <img
            src="/images/picture_paris.png"
            alt="Image de fond"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              zIndex: -2,
            }}
          />
        )}
        <video
          autoPlay
          loop={false}
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
            zIndex: -1,
            opacity: isVideoLoaded ? 1 : 0,
          }}
          src={`${mediaPaths.paris}`}
          onLoadedData={() => setIsVideoLoaded(true)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
