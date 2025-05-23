import { useEffect, useRef, useState } from "react";
import Arrow from "../assets/svg/Arrow";
import ReversedArrow from "../assets/svg/reverseArrow";
import { useExpertise, useSection } from "../utils/Contextboard";

interface ParagraphProps {
  children: React.ReactNode;
  homeSection?: boolean;
}

export default function Paragraph({ children, homeSection }: ParagraphProps) {
  const {
    setHeaderHeight,
    contactRef,
    currentSection,
    handleScrollSections,
    isMobile,
    setIsVisible,
    isVisible,
  } = useSection();
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const { setSubExpertise } = useExpertise();
  const [isHere, setIsHere] = useState<boolean>(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling && isVisible) {
        const element = contentRef.current;
        if (
          element &&
          element.scrollTop < element.scrollHeight - element.clientHeight
        ) {
          element.scrollTop += 1;
        }
      }
    };

    const interval = setInterval(handleScroll, 20);
    return () => clearInterval(interval);
  }, [isAutoScrolling, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          if (toggle) {
            setIsVisible(isIntersecting);
            console.log(`this is view: `, isIntersecting);
          } else {
            setIsVisible(false);
            console.log(`this is view: `, isIntersecting);
          }
          console.log(`this is view: `, isIntersecting);
          if (isMobile) {
            if (!hasBeenViewed && isIntersecting) {
              setIsHere(true);
              setHasBeenViewed(true);
            }
          } else {
            setIsHere(isIntersecting);
          }

          if (isIntersecting) {
            setSubExpertise(null);
            if (!homeSection) {
              setHeaderHeight("64px");
            } else {
              setHeaderHeight("90px");
            }
          } else {
            setToggle(false);
            const element = contentRef.current;
            if (element) {
              element.scrollTop = 0; // Revenir au début si non visible
            }
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

  const handleUserInteraction = () => {
    setIsAutoScrolling(false);
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => setIsAutoScrolling(true), 1000);
  };

  if (!children || !Array.isArray(children) || !children[0] || !children[1]) {
    return <p className="text-3xl font-bold">Error missing: children</p>;
  }
  return (
    <>
      <button
        onClick={() => {
          setToggle(!toggle);
          setIsVisible(false);
        }}
        className={`absolute left-[5%] opacity-0 transition duration-200 translate-y-10 ${
          toggle &&
          "transition duration-700 delay-150 opacity-100 sm:translate-y-0"
        } z-[200]`}
      >
        <ReversedArrow />
      </button>
      <div
        ref={paragraphRef}
        className={`w-[70%] h-full transition-all flex flex-col justify-center items-center relative ${
          currentSection === 7
            ? "gap-0 delay-500 duration-500"
            : `${
                homeSection ? "gap-4 sm:gap-2 translate-y-[7vh]" : "gap-6 sm:gap-16"
              } delay-500 duration-500`
        } `}
      >
        <button
          className={`h-fit text-left w-full
          sm:text-[40px] ${
            homeSection
              ? "text-center max-w-[78%] sm:max-w-fit sm:font-medium text-[26px]"
              : ""
          }
          ${
            toggle
              ? `opacity-0 -translate-y-3 transition duration-700`
              : `translate-y-0 transition duration-200 ${
                  isHere
                    ? `${toggle && "opacity-0"} translate-y-0`
                    : "opacity-0 translate-y-12"
                } transition duration-700 ease-in-out`
          }
          `}
        >
          {children[0]}
        </button>
        <p
          className={`h-fit relative ${
            homeSection && "hidden uppercase text-[22px] font-light"
          }
            ${
              toggle
                ? "opacity-0 -translate-y-3 transition duration-700 delay-[30ms]"
                : `${
                    isHere
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  } transition duration-700 delay-150 ease-in-out`
            } leading-5 sm:leading-8
            w-full ${!homeSection ? "text-justify" : "text-center"} 
            `}
        >
          {children[1]}
        </p>

        <div
          className={`p-4 overflow-y-auto ${
            toggle ? "opacity-100" : "opacity-0 translate-y-20 duration-200"
          } text-justify max-h-[50vh] sm:max-h-[80vh] transition duration-1000 absolute top-1/2 left-1/2 -translate-x-1/2 w-full -translate-y-1/2`}
          onMouseEnter={handleUserInteraction}
          onMouseLeave={handleUserInteraction}
          onTouchStart={handleUserInteraction}
          onTouchEnd={handleUserInteraction}
          ref={contentRef}
        >
          {children[3]}
        </div>
        <div
          className={`w-full flex ${
            homeSection ? "translate-y-2 justify-center" : "justify-end"
          }`}
        >
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
                : `mt-2 text-noir bg-blanc  shadow-2xl sm:h-[50px] sm:w-[300px]`
            } relative uppercase flex justify-center items-center leading-3 sm:h-[50px] sm:text-xs contact-us overflow-hidden group
                  `}
            >
              <span
                className={`transition duration-300 ease-in-out ${
                  homeSection && "text-[12px] sm:text-base"
                } group-hover:-translate-x-[8px]`}
              >
                {children[2]}
              </span>
              <span className="transition duration-300 ease-in-out opacity-0 absolute sm:right-12 group-hover:opacity-100 group-hover:translate-x-[8px]">
                <Arrow />
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
