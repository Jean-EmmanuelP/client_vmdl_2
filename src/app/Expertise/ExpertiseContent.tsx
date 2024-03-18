import { useEffect, useMemo, useRef, useState } from "react";
import { LangueCode, useExpertise, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";
import Conseil from "./Conseil";
import Contentieux from "./Contentieux";
import Affaires from "./Affaires";
import TextCycle from "../Components/TextCycle";
import { CSSTransition } from "react-transition-group";

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

  function handleClick(
    activeContent: "conseil" | "contentieux" | "affaires" | null
  ) {
    setIsHoveringExpertiseButton("none");
    // setShowRideau(true);

    // setTimeout(() => {
    //   setShowRideau(false);
    //   setIsVisible(false);
    // }, 2300);
    setIsVisible(false)
    // if (!isMobile) {
    //   setTimeout(() => {
    //     setSubExpertise(activeContent);
    //   }, 1000);
    // } else {
      setSubExpertise(activeContent);
    // }
  }
  const memoizedTextCycle = useMemo(() => {
    return (
      <TextCycle
        texts={[
          "Des expertises pointues, une approche transversale",
          "Des visionnaires passionnés, focalisés sur votre réussite",
        ]}
      />
    );
  }, []);
  useEffect(() => {
    subExpertise === null && setIsVisible(true);
  }, [subExpertise]);
  const expertiseRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
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
  const { title: box_1_title } = box_1;
  const { title: box_2_title } = box_2;
  const { title: box_3_title } = box_3;
  if (!isMobile) {
    return (
      <div className={`relative w-full h-[300vh] sm:h-full bg-blanc`}>
        {/* <div
          className={`rideau ${showRideau ? "rideau-animation" : ""}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            zIndex: -10,
            width: "100%",
            height: "100%",
            transform: "translateY(-100%)",
            backgroundColor: "#030303",
          }}
        ></div> */}
        {subExpertise === null && (
          <>
            <div
              className={`relative w-full px-[10%] h-full gap-[4vw] flex justify-center items-center`}
            >
              {/* title */}
              <div
                className={`absolute top-[6%] sm:top-[12%] text-[30px] sm:text-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 sm:title font-light`}
              >
                {title}
              </div>
              {/* first Box */}
              <div
                className={`expertiseWrapper wrapper1 relative w-full sm:w-1/3 h-[80%] sm:h-[55%] overflow-hidden`}
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
                <div className="absolute inset-0 w-full h-full text-blanc z-[2001]">
                  <h1 className="top-[10%] left-[20%] absolute uppercase">
                    {box_1_title}
                  </h1>
                  <div className="text-wrapper absolute bottom-[20%] w-full -translate-y-1/2">
                    <span className="pl-[20%] text-line">
                      VMDL, un cabinet d'avocats
                    </span>
                    <span className="pl-[20%] text-line">en lien avec le football</span>
                    <span className="pl-[20%] text-line">dans differentes regions du monde</span>
                    <span className="pl-[20%] text-line">proche de ses partenaires</span>
                  </div>
                </div>
              </div>
              {/* second Box */}
              <div
                className="expertiseWrapper wrapper2 relative w-full sm:w-1/3 h-[80%] sm:h-[55%] overflow-hidden"
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
                <div className="absolute inset-0 w-full h-full text-blanc z-[2001]">
                  <h1 className="top-[10%] left-[20%] absolute uppercase">
                    {box_2_title}
                  </h1>
                  <div className="text-wrapper absolute bottom-[20%] w-full -translate-y-1/2">
                    <span className="pl-[20%] text-line">
                      VMDL vous conseille
                    </span>
                    <span className="pl-[20%] text-line">au jour le jour</span>
                    <span className="pl-[20%] text-line">au jour le jour</span>
                    <span className="pl-[20%] text-line">au jour le jour</span>
                  </div>
                </div>
              </div>
              {/* third Box */}
              <div
                className="expertiseWrapper wrapper3 relative w-full sm:w-1/3 h-[80%] sm:h-[55%] overflow-hidden"
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
                <div className="absolute inset-0 w-full h-full text-blanc z-[2001]">
                  <h1 className="top-[10%] left-[20%] absolute uppercase">
                    {box_3_title}
                  </h1>
                  <div className="text-wrapper absolute bottom-[20%] w-full -translate-y-1/2">
                    <span className="pl-[20%] text-line">
                      VMDL vous conseille
                    </span>
                    <span className="pl-[20%] text-line">au jour le jour</span>
                    <span className="pl-[20%] text-line">au jour le jour</span>
                    <span className="pl-[20%] text-line">au jour le jour</span>
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
