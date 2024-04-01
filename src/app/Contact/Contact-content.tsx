import FormContact from "../Components/Form";
import { useEffect, useRef, useState } from "react";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function ContactContent() {
  const { data } = useData();
  const { langueCourante, isMobile } = useSection();
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState<boolean>(false);
  const contactRef = useRef<HTMLDivElement>(null);

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

  if (typeof window !== "undefined") {
    return (
      <div
        ref={contactRef}
        className="w-full h-full flex justify-center items-center bg-[#FAFAFA]"
      >
        <div className="flex flex-col w-[45%] -mt-[85px] sm:-mt-18">
          <h1
            className={`${!isVisible
                ? "opacity-0 translate-y-12 transition duration-700 ease-in-out"
                : "opacity-100 translate-y-0 transition duration-700 ease-in-out"
              } uppercase text-center py-4 text-[23px] tracking-wide sm:text-[40px] sm:title font-light`}
          >
            {title}
          </h1>
          <div
            className={`${!isVisible
                ? "opacity-0 translate-y-12 transition duration-700 delay-100 ease-in-out"
                : "opacity-100 translate-y-0 transition duration-700 delay-100 ease-in-out"
              }`}
          >
            <FormContact />
          </div>
        </div>
      </div>
    );
  }
}
