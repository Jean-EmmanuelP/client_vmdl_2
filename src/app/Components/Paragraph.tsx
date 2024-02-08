import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useSection } from "../utils/Contextboard";
import { twMerge } from "tailwind-merge";
import Arrow from "../assets/svg/Arrow";

interface ParagraphProps {
  section: number;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  classTitle?: string;
  classText?: string;
  homeSection?: boolean;
}

export default function Paragraph({
  section,
  children,
  bgColor,
  textColor,
  className,
  classTitle,
  classText,
  homeSection,
}: ParagraphProps) {
  const { currentSection, setCurrentSection, setHeaderHeight } = useSection();
  const [animateEntry, setAnimateEntry] = useState<number[]>([
    0, 0, 0, 0, 0, 0,
  ]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [previousState, setPreviousState] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const mergedClass = twMerge(
    "relative w-full h-full flex flex-col justify-center items-center gap-4 pt-4",
    className
  );
  const mergedTitle = twMerge(
    `text-[40px] ${toggle && "absolute left-2"}`,
    classTitle
  );
  const mergedText = twMerge("w-[70%] text-center mb-2", classText);
  const oppositeBg = bgColor === "#F9F9F9" ? "#F9F9F9" : "#F9F9F9";
  const oppositeText = textColor === "#030303" ? "#030303" : "#030303";
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = (value: number) => {
    const mainDiv = document.getElementById("main");

    if (mainDiv)
      mainDiv.scrollTo({
        top: mainDiv.clientHeight * value,
        behavior: "smooth",
      });
    setCurrentSection(value);

    if (value === 0) setHeaderHeight("128px");
    else setHeaderHeight("64px");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (section === currentSection) {
      const newAnimationState = [0, 0, 0, 0, 0, 0];
      newAnimationState[section] = 1;
      setAnimateEntry(newAnimationState);
    } else {
      timer = setTimeout(() => {
        setAnimateEntry([0, 0, 0, 0, 0, 0]);
        setToggle(false);
        setPreviousState(false);
      }, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentSection, section]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px est généralement la largeur max pour les appareils mobiles en mode portrait
    };

    // Vérifier une fois et ensuite ajouter un écouteur d'événement pour les changements de taille
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  if (!children || !Array.isArray(children) || !children[0] || !children[1]) {
    return <p className="text-3xl font-bold">Error missing: children</p>;
  }

  //initial = etat de base avant animation
  //animate = etat final apres animation
  //transition = delay ou duration
  return (
    <motion.div
      key={`${section}-primary`}
      initial={{ opacity: 0, backgroundColor: bgColor, color: textColor }}
      animate={{
        opacity: 1,
        backgroundColor: toggle ? oppositeBg : bgColor,
        color: toggle ? oppositeText : textColor,
      }}
      transition={{
        opacity: { duration: 0.5 },
        backgroundColor: { duration: !toggle && previousState ? 1.5 : 0.8 },
        textColor: { duration: 0.2 },
      }}
      className={mergedClass}
    >
      <Fragment key={`${section}-paragraph`}>
        <motion.button
          onClick={() => setToggle(false)}
          key={`${section}-title`}
          initial={{ y: "0px", opacity: 0 }}
          animate={{
            y: animateEntry[section] ? (toggle ? "-40px" : 0) : "40px",
            x: toggle ? "-0px" : 0,
            opacity: animateEntry[section] ? 1 : 0,
          }}
          transition={{
            delay: !toggle && !previousState ? 0.5 : 0,
            duration: 0.5,
          }}
          className={mergedTitle}
        >
          {!toggle ? (
            children[0]
          ) : (
            <img
              src="https://www.svgrepo.com/show/70596/left-arrow.svg"
              alt="Left Arrow"
              className="w-4 h-4"
            />
          )}
        </motion.button>

        <motion.p
          key={`${section}-text`}
          initial={{ y: "40px", opacity: 0 }}
          animate={{
            y: animateEntry[section] ? (toggle ? "-10px" : 0) : "40px",
            opacity: animateEntry[section] ? (!toggle ? 1 : 0) : 0,
          }}
          // transition={{ delay: !toggle && !previousState ? 0.6 : 0, duration: 0.2 }}
          transition={{
            opacity: {
              delay: !toggle && !previousState ? 0.6 : 0,
              duration: 0.5,
            },
            delay: !toggle && !previousState ? 0.6 : 0,
            duration: 0.5,
          }}
          className={mergedText}
        >
          {children[1]}
        </motion.p>

        {toggle && (
          <motion.p
            key={`${section}-text-bis`}
            initial={{ y: "0px", opacity: 0 }}
            animate={{ y: "-40px", opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={`text-xl w-1/2 text-center mb-2 ${
              isMobile ? "-mt-[64px]" : "-mt-[50px]"
            }`}
          >
            {children[3]}
          </motion.p>
        )}

        {children.length > 2 && (
          <motion.button
            data-clickable="true"
            key={`${section}-button`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ y: "40px", opacity: 0, backgroundColor: "#FFFFFF" }}
            animate={{
              y: animateEntry[section] ? 0 : "40px",
              opacity: animateEntry[section] && !toggle ? 1 : 0,
              backgroundColor: isHovering ? "" : "",
            }}
            transition={{
              backgroundColor: { delay: 0, duration: 0.3 },
              delay: toggle && !previousState ? 0 : 0.7,
              duration: 0.5,
            }}
            onClick={() => {
              if (section > 0) setToggle(true);
              else handleScroll(5);
            }}
            className={`text-[#181a1b] p-4 ${
              !homeSection
                ? `rounded-full w-[280px] hover:bg-gray-500/5 transition duration-150`
                : `text-white tracking-wide rounded-md bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/20 shadow-2xl p-2 sm:p-4 w-[169px] sm:w-[220px]`
            } text-sm uppercase flex justify-center items-center `}
          >
            <motion.span
              animate={{ x: isHovering ? "0" : "8px" }}
              transition={{ duration: 0.5 }}
            >
              {children[2]}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, paddingLeft: "0px" }}
              animate={{
                opacity: isHovering ? 1 : 0,
                paddingLeft: isHovering ? "10px" : "0px",
              }}
              transition={{ duration: 0.3 }}
            >
              <Arrow />
            </motion.span>
          </motion.button>
        )}
      </Fragment>
    </motion.div>
  );
}
