import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { useExpertise, useSection } from "../utils/Contextboard";
import { twMerge } from "tailwind-merge";
import Arrow from "../assets/svg/Arrow";
import ReversedArrow from "../assets/svg/reverseArrow";

interface ParagraphProps {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  classTitle?: string;
  classText?: string;
  homeSection?: boolean;
}

export default function Paragraph({
  children,
  bgColor,
  textColor,
  className,
  classTitle,
  classText,
  homeSection,
}: ParagraphProps) {
  const { currentSection, setCurrentSection, setHeaderHeight, isMobile } =
    useSection();
  const [isVisible, setIsVisible] = useState(false);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { setSubExpertise } = useExpertise();

  const handleScroll = (value: number) => {
    const mainDiv = document.getElementById("main");

    if (mainDiv)
      mainDiv.scrollTo({
        top: mainDiv.clientHeight * value,
        behavior: "smooth",
      });
    setCurrentSection(value);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;

          if (isIntersecting) {
            setSubExpertise(null);
            setIsVisible(true);
            if (!homeSection) {
              setHeaderHeight("64px");
            } else {
              setHeaderHeight("90px");
            }
          } else {
            setIsVisible(false);

            setToggle(false);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (paragraphRef.current) {
      observer.observe(paragraphRef.current);
    }

    return () => {
      if (paragraphRef.current) {
        observer.unobserve(paragraphRef.current);
      }
    };
  }, []);

  if (!children || !Array.isArray(children) || !children[0] || !children[1]) {
    return <p className="text-3xl font-bold">Error missing: children</p>;
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      backgroundColor: toggle ? bgColor : bgColor,
      color: toggle ? textColor : textColor,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0 },
    },
  };

  const mergedClass = twMerge(
    "relative w-full h-full flex flex-col justify-center items-center gap-4 pt-4",
    className
  );
  const mergedTitleClass = twMerge(
    `text-[40px] ${toggle ? "absolute left-[10%]" : ""}`,
    classTitle
  );
  const mergedTextClass = twMerge(
    `w-[70%] transition leading-5 sm:leading-8 mb-2 text-center`,
    classText
  );

  if (typeof window !== "undefined")
    return (
      <motion.div
        ref={paragraphRef}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        exit="exit"
        variants={variants}
        className={mergedClass}
      >
        <AnimatePresence>
          {isVisible && (
            <Fragment>
              <motion.button
                onClick={() => setToggle(false)}
                initial={{ y: "0px", opacity: 0 }}
                animate={{ y: toggle ? "-20px" : 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                className={mergedTitleClass}
              >
                {!toggle ? children[0] : <ReversedArrow />}
              </motion.button>

              <motion.p
                initial={{ y: "40px" }}
                animate={{ y: toggle ? "-10px" : 0, opacity: toggle ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={mergedTextClass}
              >
                {children[1]}
              </motion.p>

              {toggle && (
                <motion.p
                  initial={{ y: "0px", opacity: 0 }}
                  animate={{ y: "-40px", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className={`text-xl w-1/2 text-left leading-5 sm:leading-8 mb-2 max-h-[50%] max-w-[70%] overflow-auto ${
                    isMobile ? "-mt-[200px]" : "-mt-[50px]"
                  }`}
                >
                  {children[3]}
                </motion.p>
              )}

              {children.length > 2 && !toggle && (
                <motion.button
                  data-clickable="true"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  initial={{
                    y: "20px",
                    opacity: 0,
                  }}
                  animate={{
                    y: isVisible ? 0 : "40px",
                    opacity: isVisible ? 1 : 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    y: { type: "tween", ease: "linear", duration: 0.5 },
                    opacity: { type: "tween", ease: "linear", duration: 0.5 },
                    backgroundColor: {
                      type: "tween",
                      ease: "linear",
                      duration: 0.5,
                    },
                    delay: toggle ? 0 : 0.7,
                  }}
                  onClick={() => {
                    homeSection ? handleScroll(5) : setToggle(!toggle);
                    setIsHovering(false);
                  }}
                  className={`text-[#181a1b] p-4 ${
                    !homeSection
                      ? `relative w-[180px] sm:w-[280px] border-[0.5px] border-noir transition duration-150`
                      : `text-noir bg-blanc  shadow-2xl sm:h-[50px] sm:w-[300px]`
                  } uppercase flex justify-center items-center leading-3 sm:h-[50px] sm:text-xs contact-us overflow-hidden`}
                >
                  <motion.span
                    animate={{ x: isHovering ? "0" : "8px" }}
                    transition={{
                      type: "tween",
                      ease: "linear",
                      duration: 0.5,
                    }}
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
          )}
        </AnimatePresence>
      </motion.div>
    );
}
