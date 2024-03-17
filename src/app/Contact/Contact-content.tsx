import FormContact from "../Components/Form";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function ContactContent() {
  const { data } = useData();
  const { langueCourante } = useSection();
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  if (!data) {
    return null;
  }

  const langCodeMap = {
    FR: "fr",
    EN: "en",
    IT: "it",
    ES: "es",
    عربي: "عربي",
    PT: "pt",
    DE: "de",
    中文: "中文",
  };

  const langCode = langCodeMap[langueCourante] || langCodeMap["FR"];
  const { title } = data[langCode]?.contact || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (typeof window !== "undefined") {
    return (
      <motion.div
        ref={contactRef}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full h-full flex justify-center items-center"
      >
        <div className="flex flex-col w-[45%]">
          <motion.h1
            variants={itemVariants}
            className="uppercase text-center py-4 text-2xl mt-[-50px] text-[30px] sm:text-[40px] sm:title font-light"
          >
            {title}
          </motion.h1>
          <motion.div variants={itemVariants}>
            <FormContact />
          </motion.div>
        </div>
      </motion.div>
    );
  }
}
