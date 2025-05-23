import Image from 'next/image';
import { useEffect, useState } from "react";
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
    expertiseRef,
    currentSection
  } = useSection();
  const { data } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const laptopOrMobile = isMobile ? "mobile" : "laptop";
  const pathImages = [`/images/expertise/${laptopOrMobile}/football.webp`, `/images/expertise/${laptopOrMobile}/vosges_expertise.webp`, `/images/expertise/${laptopOrMobile}/paris_tribunal.webp`];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          if (isMobile) {
            if (!hasBeenViewed && isIntersecting) {
              setIsVisible(isIntersecting);
              setHasBeenViewed(true);
            }
          } else {
            setIsVisible(isIntersecting);
          }
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
    setIsVisible(false);
    setSubExpertise(activeContent);
    if (isMobile) {
      const mainContainer = document.getElementById('main');
      if (mainContainer && expertiseRef.current) {
        const offsetTop = expertiseRef.current.offsetTop + (expertiseRef.current.offsetHeight / 10) - mainContainer.offsetTop;

        mainContainer.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }
  useEffect(() => {
    if (subExpertise === null && currentSection === 2) setIsVisible(true)
  }, [subExpertise]);

  useEffect(() => {
  }, [subExpertise])
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
  const { title: box_1_title } = box_1;
  const { title: box_2_title } = box_2;
  const { title: box_3_title } = box_3;
  if (!isMobile) {
    return (
      <div ref={expertiseRef} className={`relative w-full sm:h-full bg-blanc`}>
        {subExpertise === null && (
          <>
            <div
              className={`relative w-full h-full gap-[4vw] flex justify-center items-center`}
            >
              {/* title */}
              <div
                className={`${isVisible
                  ? "opacity-100 translate-y-0 transition duration-700"
                  : "opacity-0 translate-y-20 transition duration-700"
                  } absolute top-[8%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] uppercase text-[30px] sm:text-[40px] font-light`}
              >
                {title}
              </div>
              <div
                className={`flex justify-center space-x-[10vw] items-center w-[70%] h-[80%]`}
              >
                {/* first Box */}
                <div
                  className={`
                  ${isVisible
                      ? "opacity-100 translate-y-0 transition duration-700 delay-100 ease-in-out"
                      : "opacity-0 translate-y-20 transition duration-700 delay-100 ease-in-out"
                    }
                    relative aspect-video w-[35%] sm:h-[80%] overflow-hidden group`}
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
                    src={`/images/expertise/laptop/football.webp`}
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
                  relative aspect-video w-[35%] sm:h-[80%] overflow-hidden group`}
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
                    src="/images/expertise/laptop/vosges_expertise.webp"
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
                {/* <div
                  className={`
                  ${isVisible
                      ? "opacity-100 translate-y-0 transition duration-700 delay-500 ease-in-out"
                      : "opacity-0 translate-y-20 transition duration-700 delay-500 ease-in-out"
                    }
                  relative w-[30%] sm:h-[80%] overflow-hidden group`}
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
                    src="/images/expertise/laptop/paris_tribunal.webp"
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
                </div> */}
              </div>
            </div>
            <div id="cursor-root"></div>
          </>
        )}
        {/* Contenu actif */}
        <div className={`transition duration-[1500ms] ease-in-out ${subExpertise === 'conseil' ? 'opacity-100 w-full h-full' : 'opacity-0 duration-0 delay-0 -z-10'}`}>
          <Conseil />
        </div>
        <div className={`transition duration-[1500ms] ease-in-out ${subExpertise === 'contentieux' ? 'opacity-100 w-full h-full' : 'opacity-0 duration-0 delay-0 -z-10'}`}>
          <Contentieux />
        </div>
        <div className={`transition duration-[1500ms] ease-in-out ${subExpertise === 'affaires' ? 'opacity-100 w-full h-full' : 'opacity-0 duration-0 delay-0 -z-10'}`}>
          <Affaires />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full bg-blanc relative" ref={expertiseRef}>
        {subExpertise === null && (
          <>
            {/* Titre */}
            <div className={`
            ${isVisible
                ? "opacity-100 translate-y-0 transition duration-700 ease-in-out"
                : "opacity-0 translate-y-20 transition duration-700 ease-in-out"
              }
            absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2  uppercase text-[30px] sm:text-[40px] font-light w-[80%]`}>
              {title}
            </div>

            {/* Boîtes cliquables */}
            <div className="absolute top-[55%] w-[80%] h-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-12 justify-around py-10 items-center flex-col">
              {[1, 2].map((number) => (
                <div
                  key={number}
                  className={`
                  ${isVisible
                      ? "opacity-100 translate-y-0 transition duration-700 delay-100 ease-in-out"
                      : "opacity-0 translate-y-20 transition duration-700 delay-100 ease-in-out"
                    }
                  w-[70%] h-1/2 relative cursor-pointer`}
                  onClick={() => {
                    const targetContent =
                      number === 0
                        ? "conseil"
                        : number === 1
                          ? "contentieux"
                          : "affaires";
                    handleClick(targetContent);
                  }}
                >
                  <Image
                    src={`${pathImages[--number]}`}
                    layout="fill"
                    objectFit="cover"
                    alt="Picture of the author"
                    className={`
                    group-hover:scale-110 transition duration-300`}
                  />
                  <h1 className="top-[10%] text-blanc left-[20%] absolute uppercase font-semibold">
                    {number === 0
                      ? box_1_title
                      : number === 1
                        ? box_2_title
                        : box_3_title}
                  </h1>
                </div>
              ))}
            </div>
          </>
        )}
        {/* Contenu actif */}
        <div className={`transition duration-[1500ms] ease-in-out ${subExpertise === 'conseil' ? 'opacity-100 w-full h-full' : 'opacity-0 duration-0 delay-0 -z-10'}`}>
          <Conseil />
        </div>
        <div className={`transition duration-[1500ms] ease-in-out ${subExpertise === 'contentieux' ? 'opacity-100 w-full h-full' : 'opacity-0 duration-0 delay-0 -z-10'}`}>
          <Contentieux />
        </div>
        <div className={`transition duration-[1500ms] ease-in-out ${subExpertise === 'affaires' ? 'opacity-100 w-full h-full' : 'opacity-0 duration-0 delay-0 -z-10'}`}>
          <Affaires />
        </div>
      </div>
    );
  }
}
