import { motion, AnimatePresence } from "framer-motion";
import { useSection } from "../utils/Contextboard";

declare global {
  interface Window {
    MSStream?: any;
  }
}
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

  function convertToMp4Path(webmPath: string) {
    return webmPath.replace(".webm", ".mp4");
  }

  // Fonction pour détecter les appareils iOS
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
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
          poster="/images/paris_global_view.jpeg"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
            zIndex: -1,
          }}
          {...(isIOS()
            ? { "data-wf-ignore": "true", "data-object-fit": "cover" }
            : {})}
        >
          <source src={`${mediaPaths.paris}`} type="video/webm" />
          <source
            src={`${convertToMp4Path(mediaPaths.paris)}`}
            type="video/mp4"
            {...(isIOS() ? { "data-wf-ignore": "true" } : {})}
          />
        </video>
      </motion.div>
    </AnimatePresence>
  );
}
