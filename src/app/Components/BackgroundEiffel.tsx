import { motion, AnimatePresence } from "framer-motion";
import { useSection } from "../utils/Contextboard";

export default function BackgroundEiffel() {
  const { mediaPaths, setIsLoading } = useSection();

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleVideoLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1300);
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
        <video
          autoPlay
          loop
          muted
          onLoadedData={handleVideoLoad}
          playsInline
          poster="/images/paris.jpeg"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
            zIndex: -1,
          }}
        >
          <source src={`${mediaPaths.paris}`} type="video/webm" />
        </video>
      </motion.div>
    </AnimatePresence>
  );
}
