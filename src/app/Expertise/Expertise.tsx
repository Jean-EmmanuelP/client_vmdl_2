import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import Conseil from "./Conseil";
import Contentieux from "./Contentieux";
import dynamic from "next/dynamic";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

const Affaires = dynamic(() => import("./Affaires"), { ssr: false });

export default function Expertise() {
  const [hovering, setHovering] = useState<number>(0);
  const { subExpertise, setSubExpertise } = useExpertise();
  const { langueCourante, currentSection } = useSection();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;
  const { data } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setSubExpertise(null);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setSubExpertise]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    setHovering(0);
  }, [subExpertise]);

  if (!data) {
    return null;
  }
  const langCodeMap: { [key in LangueCode]: string } = {
    FR: 'fr',
    EN: 'en',
    IT: 'it',
    ES: 'es',
    عربي: 'عربي',
    PT: 'pt',
    DE: 'de',
	中文: '中文'
  };
  const langCode = langCodeMap[langueCourante as LangueCode] || langCodeMap['FR'];
  const { title, box_1, box_2, box_3 } = data[langCode].section_3;
  const { title: box_1_title } = box_1;
  const { title: box_2_title } = box_2;
  const { title: box_3_title } = box_3;

  return (
    <Fragment key="ExpertiseFragment">
      <div className="relative w-full h-full">
        <motion.div
          animate={{ x: !subExpertise ? "0" : "-100vw" }}
          transition={{ duration: 1 }}
          id="Expertise"
          className="w-full h-full text-noir"
        >
          <motion.div className="w-full h-[20%] flex justify-center items-center bg-blanc">
            <p className="uppercase text-[40px] sm:text-[60px] font-light">{title}</p>
          </motion.div>

          <div className="flex w-full h-[50%] text-xl font-semibold flex-col sm:flex-row">
            <div className="sm:w-[15%] h-full bg-blanc hidden sm:block"></div>
            <motion.div
              animate={{ }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-center items-center sm:items-start sm:justify-start sm:flex-row w-full sm:w-[70%] h-full uppercase font-light text-white"
            >
              <motion.button
                id="conseil"
                onClick={() => setSubExpertise("conseil")}
                onMouseEnter={() => setHovering(1)}
                onMouseLeave={() => setHovering(0)}
                animate={{
                  border:
                    hovering === 1 ? "1px solid #F9F9F9" : "10px solid #F9F9F9",
                  backgroundColor:
                    hovering === 1
                      ? "rgba(0, 0, 0, 0)"
                      : "rgba(0, 0, 0, 0)",
                }}
                transition={{ duration: 0.1 }}
                className="relative w-full sm:w-[32%] h-full flex justify-center items-center px-10 sm:my-0 text-md sm:text-3xl"
              >
                {isMobile && (<><div className="absolute top-0 left-0 w-[15%] bg-blanc h-full"></div>
                <div className="absolute top-0 right-0 w-[15%] bg-blanc h-full"></div>
                <div className="absolute bottom-0 right-0 w-full bg-blanc h-[10%]"></div>
                <div className="absolute top-0 right-0 w-full bg-blanc h-[10%]"></div></>)}
                {box_1_title}
              </motion.button>
              <div className="hidden sm:block sm:w-[2%] h-full bg-blanc"></div>

              <motion.button
                id="contentieux"
                onClick={() => setSubExpertise("contentieux")}
                onMouseEnter={() => setHovering(2)}
                onMouseLeave={() => setHovering(0)}
                animate={{
                  border:
                    hovering === 2 ? "1px solid #F9F9F9" : "10px solid #F9F9F9",
                  backgroundColor:
                    hovering === 2
                      ? "rgba(0, 0, 0, 0)"
                      : "rgba(0, 0, 0, 0)",
                }}
                transition={{ duration: 0.2 }}
                className="relative w-full sm:w-[32%] h-full flex justify-center items-center px-10 sm:my-0 text-md sm:text-3xl"
              >
                {isMobile && (<><div className="absolute top-0 left-0 w-[15%] bg-blanc h-full"></div>
                <div className="absolute top-0 right-0 w-[15%] bg-blanc h-full"></div>
                <div className="absolute bottom-0 right-0 w-full bg-blanc h-[10%]"></div>
                <div className="absolute top-0 right-0 w-full bg-blanc h-[10%]"></div></>)}
                {box_2_title}
              </motion.button>
              <div className="hidden sm:block sm:w-[2%] h-full bg-blanc"></div>
              <motion.button
                id="affaires"
                onClick={() => setSubExpertise("affaires")}
                onMouseEnter={() => setHovering(3)}
                onMouseLeave={() => setHovering(0)}
                animate={{
                  border:
                    hovering === 3 ? "1px solid #F9F9F9" : "10px solid #F9F9F9",
                  backgroundColor:
                    hovering === 3
                      ? "rgba(0, 0, 0, 0)"
                      : "rgba(0, 0, 0, 0)",
                }}
                transition={{ duration: 0.2 }}
                className="relative w-full sm:w-[32%] h-full flex justify-center items-center px-10 sm:my-0 text-md sm:text-3xl"
              >
                {isMobile && (<><div className="absolute top-0 left-0 w-[15%] bg-blanc h-full"></div>
                <div className="absolute top-0 right-0 w-[15%] bg-blanc h-full"></div>
                <div className="absolute bottom-0 right-0 w-full bg-blanc h-[10%]"></div>
                <div className="absolute top-0 right-0 w-full bg-blanc h-[10%]"></div></>)}
                {box_3_title}
              </motion.button>
            </motion.div>
            <div className="w-full sm:w-[15%] h-full hidden sm:block bg-blanc"></div>
          </div>
          <div className="w-full h-[30%] bg-blanc"></div>
        </motion.div>
        <Conseil />
        <Contentieux />
        <Affaires />
      </div>
    </Fragment>
  );
}
