import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import Affaires from "./Affaires";
import Conseil from "./Conseil";
import Contentieux from "./Contentieux";

export default function ExpertiseContent() {
  const { subExpertise, setSubExpertise } = useExpertise();
  const {
    langueCourante,
    isMobile,
    setIsHoveringExpertiseButton,
    headerHeight,
  } = useSection();
  const { data } = useData();
  const [isVisible, setIsVisible] = useState(true);
  const [showRideau, setShowRideau] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    if (expertiseRef.current) {
      observer.observe(expertiseRef.current);
    }

    return () => {
      if (expertiseRef.current) {
        observer.unobserve(expertiseRef.current);
      }
    };
  }, []);

  function handleClick(
    activeContent: "conseil" | "contentieux" | "affaires" | null
  ) {
    setIsHoveringExpertiseButton("none");
    // setShowRideau(true);

    // setTimeout(() => {
    //   setShowRideau(false);
    //   setIsVisible(false);
    // }, 2300);
    setIsVisible(false);
    // if (!isMobile) {
    //   setTimeout(() => {
    //     setSubExpertise(activeContent);
    //   }, 1000);
    // } else {
    setSubExpertise(activeContent);
    // }
  }
  useEffect(() => {
    subExpertise === null && setIsVisible(true);
  }, [subExpertise]);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    if (expertiseRef.current) {
      observer.observe(expertiseRef.current);
    }

    return () => {
      if (expertiseRef.current) {
        observer.unobserve(expertiseRef.current);
      }
    };
  }, []);
  if (!data) {
    return null;
  }

  const langCodeMap: { [key in LangueCode]: string } = {
    FR: "fr",
    EN: "en",
    IT: "it",
    ES: "es",
    عربي: "عربي",
    PT: "pt",
    DE: "de",
    中文: "中文",
  };
  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];

  const { title, box_1, box_2, box_3 } = data[langCode].section_3;
  const { title: box_1_title, title_description: title_1_description } = box_1;
  const { title: box_2_title, title_description: title_2_description } = box_2;
  const { title: box_3_title, title_description: title_3_description } = box_3;
  if (!isMobile) {
    return (
      <div ref={expertiseRef} className={`relative w-full sm:h-full bg-blanc`}>
        {subExpertise === null && (
          <>
            <div
              className={`relative w-full px-[10%] h-full gap-[4vw] flex justify-center items-center`}
            >
              {/* title */}
              <div
                className={`${isVisible
                  ? "opacity-100 translate-y-0 transition duration-700"
                  : "opacity-0 translate-y-20 transition duration-700"
                  } absolute top-[8%] text-[30px] sm:text-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light`}
              >
                {title}
              </div>
              <div
                className={`flex justify-center items-center gap-14 h-[80%] w-full`}
              >
                {/* first Box */}
                <div
                  className={`
                  ${isVisible
                      ? "opacity-100 translate-y-0 transition duration-700 delay-100 ease-in-out"
                      : "opacity-0 translate-y-20 transition duration-700 delay-100 ease-in-out"
                    }
                    relative w-[24%] sm:h-[80%] overflow-hidden group`}
                  onMouseEnter={() => {
                    setIsHoveringExpertiseButton("conseil");
                  }}
                  onMouseLeave={() => {
                    setIsHoveringExpertiseButton("none");
                  }}
                  onClick={() => {
                    handleClick("conseil");
                  }}
                >
                  <Image
                    src="/images/cpy.jpeg"
                    layout="fill"
                    objectFit="cover"
                    alt="Picture of the author"
                    className="group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 w-full h-full text-blanc z-[2001]">
                    <h1 className="top-[10%] text-[20px] left-[12%] absolute uppercase">
                      {box_1_title}
                    </h1>
                  </div>
                </div>
                {/* second Box */}
                <div
                  className={`
                  ${isVisible
                      ? "opacity-100 translate-y-0 transition duration-700 delay-300 ease-in-out"
                      : "opacity-0 translate-y-20 transition duration-700 delay-300 ease-in-out"
                    }
                  relative w-[24%] sm:h-[80%] overflow-hidden group`}
                  onMouseEnter={() => {
                    setIsHoveringExpertiseButton("contentieux");
                  }}
                  onMouseLeave={() => {
                    setIsHoveringExpertiseButton("none");
                  }}
                  onClick={() => {
                    handleClick("contentieux");
                  }}
                >
                  <Image
                    src="/images/vosges.jpeg"
                    layout="fill"
                    objectFit="cover"
                    alt="Picture of the author"
                    className="group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 w-full h-full text-blanc z-[2001]">
                    <h1 className="top-[10%] text-[20px] left-[12%] absolute uppercase">
                      {box_2_title}
                    </h1>
                  </div>
                </div>
                {/* third Box */}
                <div
                  className={`
                  ${isVisible
                      ? "opacity-100 translate-y-0 transition duration-700 delay-500 ease-in-out"
                      : "opacity-0 translate-y-20 transition duration-700 delay-500 ease-in-out"
                    }
                  relative w-[24%] sm:h-[80%] overflow-hidden group`}
                  onMouseEnter={() => {
                    setIsHoveringExpertiseButton("affaires");
                  }}
                  onMouseLeave={() => {
                    setIsHoveringExpertiseButton("none");
                  }}
                  onClick={() => {
                    handleClick("affaires");
                  }}
                >
                  <Image
                    src="/images/paris_tribunal.jpeg"
                    layout="fill"
                    objectFit="cover"
                    alt="Picture of the author"
                    className="group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 w-full h-full text-blanc z-[2001]">
                    <h1 className="top-[10%] text-[20px] left-[12%] absolute uppercase">
                      {box_3_title}
                    </h1>
                  </div>
                </div>
              </div>
              {/* <div className="absolute w-full px-[14%] bottom-[13%] mb-2">
              {memoizedTextCycle}
              <div className="border-b border-noir"></div>
            </div> */}
            </div>
            <div id="cursor-root"></div>
          </>
        )}
        {/* Contenu actif */}
        {subExpertise === "conseil" && <Conseil />}
        {subExpertise === "contentieux" && <Contentieux />}
        {subExpertise === "affaires" && <Affaires />}
      </div>
    );
  } else {
    return (
      <div className="w-full h-[130vh] bg-blanc relative" ref={expertiseRef}>
        {subExpertise === null && (
          <>
            {/* Titre */}
            <div className="absolute top-[10%] text-[20px] left-1/2 -translate-x-1/2 -translate-y-1/2 font-light">
              {title}
            </div>

            {/* Boîtes cliquables */}
            <div className="absolute top-[55%] w-[80%] h-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 justify-center items-center flex-col">
              {[1, 2, 3].map((number) => (
                <div
                  key={number}
                  className={`w-full h-1/3 bg-blue-500 expertiseWrapper wrapper${number} relative cursor-pointer`} // Ajout de cursor-pointer pour indiquer la cliquabilité
                  onClick={() => {
                    const targetContent =
                      number === 1
                        ? "conseil"
                        : number === 2
                          ? "contentieux"
                          : "affaires";
                    handleClick(targetContent);
                  }}
                >
                  <h1 className="top-[10%] text-blanc left-[20%] absolute uppercase font-semibold">
                    {number === 1
                      ? box_1_title
                      : number === 2
                        ? box_2_title
                        : box_3_title}
                  </h1>
                </div>
              ))}
            </div>
          </>
        )}
        {/* Affichage conditionnel des composants */}
        <CSSTransition
          in={subExpertise === "conseil"}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <Conseil />
        </CSSTransition>

        <CSSTransition
          in={subExpertise === "contentieux"}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <Contentieux />
        </CSSTransition>

        <CSSTransition
          in={subExpertise === "affaires"}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <Affaires />
        </CSSTransition>
      </div>
    );
  }
}
