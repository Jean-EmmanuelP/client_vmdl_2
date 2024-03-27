import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { useExpertise, useSection } from "../utils/Contextboard";
import { twMerge } from "tailwind-merge";
import Arrow from "../assets/svg/Arrow";
import ReversedArrow from "../assets/svg/reverseArrow";

interface ParagraphProps {
  children: React.ReactNode;
  homeSection?: boolean;
}

export default function Paragraph({ children, homeSection }: ParagraphProps) {
  const {
    currentSection,
    setHeaderHeight,
    isMobile,
    contactRef,
    handleScrollSections,
  } = useSection();
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const { setSubExpertise } = useExpertise();
  const [isHere, setIsHere] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          setIsHere(isIntersecting);
          if (isIntersecting) {
            setSubExpertise(null);
            if (!homeSection) {
              setHeaderHeight("64px");
            } else {
              setHeaderHeight("90px");
            }
          } else {
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

  const containerVariants = {
    hidden: {},
    visible: {},
  };
  const itemVariants = {
    hidden: {},
    visible: {},
  };

  if (typeof window !== "undefined") {
    return (
      <div
        ref={paragraphRef}
        className={`${
          (currentSection === 4 || currentSection === 0) && "text-blanc"
        } transition duration-500 w-full h-full flex flex-col gap-2 sm:gap-4 justify-center items-center relative`}
      >
        <button
          onClick={() => setToggle(!toggle)}
          className={`absolute left-[10%] opacity-0 transition duration-200 translate-y-10 ${
            toggle &&
            "transition duration-700 delay-200 opacity-100 sm:translate-y-0"
          }`}
        >
          <ReversedArrow />
        </button>
        <button
          className={`
          text-[40px] ${homeSection && "font-medium text-3xl"}
          ${toggle ? `bg-red-500 -translate-y-10 transition duration-200` : `bg-green-500 translate-y-0 transition duration-200 ${isHere ? `${toggle && 'opacity-0'} translate-y-0` : "opacity-0 translate-y-12"} transition duration-700 ease-in-out`}          
          `}
        >
          {children[0]}
        </button>
        <p
          className={`${homeSection && "uppercase text-[26px] font-light"}
            ${toggle ? 'bg-red-500 -translate-y-10 transition duration-200 delay-75': `bg-green-500 ${isHere ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} transition duration-700 delay-150 ease-in-out`}
            w-[70%] leading-5 sm:leading-8 text-center
          `}
        >
          {children[1]}
        </p>
        {toggle && (
          <motion.p
            initial={{ y: "0px", opacity: 0 }}
            animate={{ y: isMobile ? "2px" : "-40px", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl bg-green-500 text-left leading-5 sm:leading-8 max-h-[50%] max-w-[70%] overflow-auto ${
              isMobile ? "-mt-[200px]" : "-mt-[50px]"
            }`}
          >
            {children[3]}
          </motion.p>
        )}
        {children.length > 2 && !toggle && (
          <button
            data-clickable="true"
            onClick={() => {
              homeSection
                ? handleScrollSections(contactRef)
                : setToggle(!toggle);
            }}
            className={`
          ${
            isHere ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          } transition duration-700 delay-300 ease-in-out
            text-[#181a1b] p-4 ${
              !homeSection
                ? `w-[180px] sm:w-[280px] border-[0.5px] border-noir/10 shadow-sm transition duration-150`
                : `text-noir bg-blanc  shadow-2xl sm:h-[50px] sm:w-[300px]`
            } relative uppercase flex justify-center items-center leading-3 sm:h-[50px] sm:text-xs contact-us overflow-hidden group
                  `}
          >
            <span
              className={`transition duration-500 ease-linear ${
                homeSection && "text-[12px] sm:text-base"
              } group-hover:-translate-x-[8px]`}
            >
              {children[2]}
            </span>
            <span className="transition duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[8px]">
              <Arrow />
            </span>
          </button>
        )}
      </div>
    );
  }
}
