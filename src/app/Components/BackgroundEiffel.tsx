import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '../utils/Contextboard';

const BackgroundEiffel: React.FC = () => {
  const { mediaPaths, setIsLoading } = useSection();

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const isIOS = (): boolean => /iPad|iPhone|iPod/.test(navigator.userAgent);

  const convertToMp4Path = (webmPath: string): string => webmPath.replace('.webm', '.mp4');

  useEffect(() => {
    const videoContainer = document.getElementById('videoContainer') as HTMLDivElement | null;
    if (videoContainer) {
      const videoSource = isIOS() ? convertToMp4Path(mediaPaths.paris) : mediaPaths.paris;
      const videoType = isIOS() ? 'video/mp4' : 'video/webm';
      const posterPath = '/videos/mobile/paris/paris_poster.png'; // Chemin de votre image poster

      // Création de l'élément vidéo
      const videoElement = document.createElement('video');
      videoElement.className = 'video-js';
      videoElement.setAttribute('webkit-playsinline', '');
      videoElement.setAttribute('playsinline', '');
      videoElement.autoplay = true;
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.poster = posterPath;
      videoElement.style.cssText = 'position: absolute; width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; z-index: -1;';

      // Création de la source vidéo
      const sourceElement = document.createElement('source');
      sourceElement.src = videoSource;
      sourceElement.type = videoType;

      videoElement.appendChild(sourceElement);

      videoElement.onloadeddata = () => setIsLoading(false);
      videoElement.onplay = () => {
        videoElement.style.display = 'block';
      };
      videoElement.onerror = () => {
        videoElement.style.display = 'none'; // Cache la vidéo en cas d'erreur
        // Affiche l'image poster si la vidéo ne peut pas être jouée
        videoContainer.style.backgroundImage = `url('${posterPath}')`;
        videoContainer.style.backgroundSize = 'cover';
        videoContainer.style.backgroundPosition = 'center';
      };

      videoElement.play().catch(() => {
        // Gestion de l'échec de l'autoplay, affiche l'image poster
        videoElement.style.display = 'none';
        videoContainer.style.backgroundImage = `url('${posterPath}')`;
        videoContainer.style.backgroundSize = 'cover';
        videoContainer.style.backgroundPosition = 'center';
      });

      // Ajout de l'élément vidéo au conteneur
      videoContainer.innerHTML = '';
      videoContainer.appendChild(videoElement);
    }
  }, [mediaPaths.paris, setIsLoading]);

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
        id="videoContainer"
      >
        {/* La vidéo ou l'image sera affichée ici */}
      </motion.div>
    </AnimatePresence>
  );
}

export default BackgroundEiffel;
