import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react'; // Importez useState et useEffect
import { useSection } from "../utils/Contextboard";

export default function BackgroundEiffel() {
  const { mediaPaths, setIsLoading } = useSection();
  const [autoplayFailed, setAutoplayFailed] = useState(false); // État pour suivre si l'autoplay a échoué

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

  // Fonction pour vérifier l'autoplay
  const checkAutoplay = () => {
    const video = document.createElement('video');
    video.muted = true;
    video.play().then(() => {
      setAutoplayFailed(false); // L'autoplay a fonctionné
    }).catch(() => {
      setAutoplayFailed(true); // L'autoplay a échoué
    });
  };

  // Utilisez useEffect pour vérifier l'autoplay au montage du composant
  useEffect(() => {
    checkAutoplay();
  }, []);

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
        {autoplayFailed ? (
          // Afficher un message si l'autoplay a échoué
          <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', zIndex: 1 }}>
            Lautoplay nest pas disponible. Veuillez démarrer la vidéo manuellement.
          </div>
        ) : (
          // Sinon, afficher la vidéo
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
          >
            <source src={`${mediaPaths.paris}`} type="video/webm" />
            <source
              src={`${convertToMp4Path(mediaPaths.paris)}`}
              type="video/mp4"
            />
          </video>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
