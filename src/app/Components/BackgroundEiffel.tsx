import { motion, AnimatePresence } from "framer-motion";
import { useExpertise } from "../utils/Contextboard";
import { useEffect, useState } from "react";

export default function BackgroundEiffel() {
  const { subExpertise } = useExpertise();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [subExpertise]);

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="eiffelVideo"
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
            playsInline
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              zIndex: -1,
            }}
            src="/videos/paris.mov"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
