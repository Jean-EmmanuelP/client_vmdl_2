import ReversedArrow from "../assets/svg/reverseArrow";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function Footer() {
  const {
    setCurrentSection,
    setHeaderHeight,
    setBgIsBlackFooter,
    setPageIs,
    pageIs,
    isMobile,
    setLangueCourante,
  } = useSection();
  const { data } = useData();
  const { langueCourante } = useSection();

  if (!data) {
    return;
  }
  // langCodeMap doubled
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
  const renderLangs = () => {
    const langues: LangueCode[] = [
      "FR",
      "EN",
      "IT",
      "ES",
      "عربي",
      "PT",
      "DE",
      "中文",
    ];

    return langues.map((langue, index) => {
      return (
        <button
          key={index}
          onClick={() => {
            setLangueCourante(langue);
          }}
          className={`text-blanc group overflow-hidden px-2 py-1 rounded-lg`}
        >
          <div
            data-clickable={true}
            className={`absolute bottom-0 w-[105%] bg-white h-[1px] -left-1 group-hover:opacity-100 transition duration-150 ${
              langueCourante === langue
                ? "-translate-x-0"
                : "group-hover:-translate-x-0 -translate-x-[100%]"
            }`}
          ></div>
          {langue}
        </button>
      );
    });
  };
  // langCode doubled
  const langCode =
    langCodeMap[langueCourante as LangueCode] || langCodeMap["FR"];
  const { title, subtitle, phoneNumber, fixNumber, address, legals } =
    data[langCode].footer;
  const handleScroll = (value: number) => {
    const mainDiv = document.getElementById("main");

    if (mainDiv)
      mainDiv.scrollTo({
        top: mainDiv.clientHeight * value,
        behavior: "smooth",
      });
    setCurrentSection(value);
    if (value === 0 && !isMobile && pageIs === "/") {
      setHeaderHeight("128px");
    } else setHeaderHeight("64px");
  };

  return (
    <div
      id="Footer"
      className="relative w-full h-full py-2 sm:py-7 px-10 gap-2 sm:gap-4 flex flex-col items-center justify-center z-10 bg-noir text-blanc"
      onMouseEnter={() => {
        setBgIsBlackFooter(true);
      }}
      onMouseLeave={() => {
        setBgIsBlackFooter(false);
      }}
    >
      <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-black">
        <div
          className="h-full flex rotate-90 transition duration-100 hover:-translate-y-1"
          onClick={() => {
            setBgIsBlackFooter(false);
            handleScroll(0);
          }}
        >
          <ReversedArrow isWhite={true} />
        </div>
      </div>
      <div
        id="footer-title"
        className="w-full text-center sm:w-4/5 flex justify-center items-center"
      >
        <div
          onClick={() => {
            setBgIsBlackFooter(false);
            handleScroll(0);
          }}
          className="group flex flex-col gap-1 sm:gap-2"
        >
          <p className="md:text-2xl group-hover:text-gray-400 transition duration-150 text-[19px] sm:text-[32px] sm:title font-semibold">
            {title}
          </p>
          <p className="uppercase flex justify-center group-hover:text-gray-400 transition duration-150 text-[15px] sm:text-[22px] sm:content leading-[26px] font-light">
            {subtitle}
          </p>
        </div>
      </div>
      <div
        id="footer-content"
        className="w-full sm:w-4/5 h-[40%] gap-2 sm:gap-4 flex flex-col justify-center items-center mb-10 text-[14px] sm:text-[16px] sm:content leading-[22px] font-light"
      >
        <div className="hidden sm:flex px-4 w-full text-left text-blanc">
          <button
            onClick={() => {
              setBgIsBlackFooter(false);
              handleScroll(0);
              setPageIs("legals");
            }}
          >
            {legals}
          </button>
        </div>
        <div className="border border-y-[0.5px] border-x-0 sm:gap-4 border-white/20 w-full flex justify-center sm:justify-between items-center p-4 pt-5 sm:py-10">
          <div
            id="footer-contact"
            className="justify-center items-center gap-1 sm:gap-6 flex flex-col sm:flex-row"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=2%20Rue%20de%20Poissy%2C%2075005%20Paris"
              target="_blank"
              className="text-[#8A8A8A] uppercase hover:scale-105 text-center transition duration-150 text-xs md:text-base"
            >
              {address}
            </a>
            <a
              href="tel:0757417287"
              className="text-[#8A8A8A] uppercase hover:scale-105 text-center transition duration-150 text-xs md:text-base"
            >
              {phoneNumber}
            </a>
            <a
              href="tel:01 44 32 13 93"
              className="text-[#8A8A8A] uppercase hover:scale-105 transition duration-150 text-xs md:text-base hidden md:block"
            >
              {fixNumber}
            </a>
            <p className="hover:scale-105 transition duration-150 text-[#8A8A8A] flex items-center gap-2">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 64 64"
                enableBackground="new 0 0 64 64"
              >
                <g>
                  <rect
                    x="1"
                    y="13"
                    fill="#8A8A8A"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    width="62"
                    height="37"
                  />
                  <polyline
                    fill="#8A8A8A"
                    stroke="black"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="1,13 32,33 63,13"
                  />
                </g>
              </svg>
              <a href="mailto:cabinet@vmdl.ai">cabinet@vmdl.ai</a>
            </p>
          </div>
          <div id="footer-social" className="hidden sm:block">
            <div className="flex justify-center items-center gap-2 md:gap-10 py-1">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="hover:scale-125 transition duration-150 hover:brightness-150"
              >
                <img
                  data-clickable={true}
                  src="data:image/svg+xml;charset=utf8,%3Csvg width='20' height='20' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M8,0 C5.82666667,0 5.55533333,0.01 4.702,0.048 C3.85,0.088 3.27,0.222 2.76,0.42 C2.234,0.624 1.78733333,0.898 1.34266667,1.34266667 C0.898,1.78733333 0.623333333,2.23333333 0.42,2.76 C0.222,3.27 0.0873333333,3.85 0.048,4.702 C0.008,5.55533333 0,5.82666667 0,8 C0,10.1733333 0.01,10.4446667 0.048,11.298 C0.088,12.1493333 0.222,12.73 0.42,13.24 C0.624,13.7653333 0.898,14.2126667 1.34266667,14.6573333 C1.78733333,15.1013333 2.23333333,15.3766667 2.76,15.58 C3.27066667,15.7773333 3.85066667,15.9126667 4.702,15.952 C5.55533333,15.992 5.82666667,16 8,16 C10.1733333,16 10.4446667,15.99 11.298,15.952 C12.1493333,15.912 12.73,15.7773333 13.24,15.58 C13.7653333,15.376 14.2126667,15.1013333 14.6573333,14.6573333 C15.1013333,14.2126667 15.3766667,13.7673333 15.58,13.24 C15.7773333,12.73 15.9126667,12.1493333 15.952,11.298 C15.992,10.4446667 16,10.1733333 16,8 C16,5.82666667 15.99,5.55533333 15.952,4.702 C15.912,3.85066667 15.7773333,3.26933333 15.58,2.76 C15.376,2.234 15.1013333,1.78733333 14.6573333,1.34266667 C14.2126667,0.898 13.7673333,0.623333333 13.24,0.42 C12.73,0.222 12.1493333,0.0873333333 11.298,0.048 C10.4446667,0.008 10.1733333,0 8,0 Z M8,1.44 C10.1353333,1.44 10.39,1.45066667 11.2333333,1.48733333 C12.0133333,1.524 12.4366667,1.65333333 12.718,1.764 C13.0926667,1.90866667 13.358,2.082 13.6393333,2.36133333 C13.9186667,2.64133333 14.092,2.90733333 14.2366667,3.282 C14.346,3.56333333 14.4766667,3.98666667 14.512,4.76666667 C14.55,5.61066667 14.5586667,5.864 14.5586667,8 C14.5586667,10.136 14.5486667,10.39 14.5093333,11.2333333 C14.4686667,12.0133333 14.3386667,12.4366667 14.2286667,12.718 C14.0793333,13.0926667 13.9093333,13.358 13.6293333,13.6393333 C13.35,13.9186667 13.08,14.092 12.7093333,14.2366667 C12.4293333,14.346 11.9993333,14.4766667 11.2193333,14.512 C10.37,14.55 10.12,14.5586667 7.98,14.5586667 C5.83933333,14.5586667 5.58933333,14.5486667 4.74066667,14.5093333 C3.96,14.4686667 3.53,14.3386667 3.25,14.2286667 C2.87066667,14.0793333 2.61,13.9093333 2.33066667,13.6293333 C2.05,13.35 1.87066667,13.08 1.73066667,12.7093333 C1.62066667,12.4293333 1.49133333,11.9993333 1.45066667,11.2193333 C1.42066667,10.3793333 1.41,10.12 1.41,7.99 C1.41,5.85933333 1.42066667,5.59933333 1.45066667,4.74933333 C1.49133333,3.96933333 1.62066667,3.54 1.73066667,3.26 C1.87066667,2.88 2.05,2.62 2.33066667,2.33933333 C2.61,2.06 2.87066667,1.88 3.25,1.74066667 C3.53,1.63 3.95066667,1.5 4.73066667,1.46 C5.58066667,1.43 5.83066667,1.42 7.97,1.42 L8,1.44 L8,1.44 Z M8,3.892 C5.73,3.892 3.892,5.732 3.892,8 C3.892,10.27 5.732,12.108 8,12.108 C10.27,12.108 12.108,10.268 12.108,8 C12.108,5.73 10.268,3.892 8,3.892 Z M8,10.6666667 C6.52666667,10.6666667 5.33333333,9.47333333 5.33333333,8 C5.33333333,6.52666667 6.52666667,5.33333333 8,5.33333333 C9.47333333,5.33333333 10.6666667,6.52666667 10.6666667,8 C10.6666667,9.47333333 9.47333333,10.6666667 8,10.6666667 Z M13.2306667,3.73 C13.2306667,4.26 12.8,4.69 12.2706667,4.69 C11.7406667,4.69 11.3106667,4.25933333 11.3106667,3.73 C11.3106667,3.20066667 11.7413333,2.77066589 12.2706667,2.77066589 C12.7993333,2.77 13.2306667,3.20066667 13.2306667,3.73 Z' id='a'/%3E%3C/defs%3E%3Cg stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'%3E%3Cg%3E%3Cmask fill='white'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cuse fill='dimgray' fillRule='nonzero' xlink:href='%23a'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                  alt=""
                />
              </a>
              <a
                href="https://www.linkedin.com/in/vincent-machado-da-luz-550a942a2/overlay/about-this-profile/"
                target="_blank"
                className="hover:scale-125 transition duration-150 hover:brightness-150"
              >
                <img
                  data-clickable={true}
                  src="data:image/svg+xml;charset=utf8,%3Csvg width='20' height='20' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M13.6313333,13.6346667 L11.262,13.6346667 L11.262,9.922 C11.262,9.03666667 11.244,7.89733333 10.0273333,7.89733333 C8.792,7.89733333 8.60333333,8.86066667 8.60333333,9.85666667 L8.60333333,13.6346667 L6.234,13.6346667 L6.234,6 L8.51,6 L8.51,7.04066667 L8.54066667,7.04066667 C8.85866667,6.44066667 9.632,5.80733333 10.7873333,5.80733333 C13.188,5.80733333 13.632,7.38733333 13.632,9.444 L13.632,13.6346667 L13.6313333,13.6346667 Z M3.558,4.95533333 C2.79533333,4.95533333 2.18266667,4.338 2.18266667,3.57866667 C2.18266667,2.82 2.796,2.20333333 3.558,2.20333333 C4.318,2.20333333 4.934,2.82 4.934,3.57866667 C4.934,4.338 4.31733333,4.95533333 3.558,4.95533333 Z M4.746,13.6346667 L2.37,13.6346667 L2.37,6 L4.746,6 L4.746,13.6346667 Z M14.8166667,0 L1.18066667,0 C0.528,0 0,0.516 0,1.15266667 L0,14.8473333 C0,15.4846667 0.528,16 1.18066667,16 L14.8146667,16 C15.4666667,16 16,15.4846667 16,14.8473333 L16,1.15266667 C16,0.516 15.4666667,0 14.8146667,0 L14.8166667,0 Z' id='a'/%3E%3C/defs%3E%3Cg stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'%3E%3Cg%3E%3Cmask fill='white'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cuse fill='dimgray' fillRule='nonzero' xlink:href='%23a'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                  alt=""
                />
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                className="hover:scale-125 transition duration-150 hover:brightness-150"
              >
                <img
                  data-clickable={true}
                  src="data:image/svg+xml;charset=utf8,%3Csvg width='20' height='16' viewBox='0 0 20 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M9.52217 6.77143L15.4785 0H14.0671L8.89516 5.87954L4.76437 0H0L6.24656 8.8909L0 15.9918H1.41155L6.87321 9.78279L11.2356 15.9918H16L9.52183 6.77143H9.52217ZM7.58887 8.96923L6.95596 8.0839L1.92015 1.03921H4.0882L8.15216 6.7245L8.78507 7.60983L14.0677 14.9998H11.8997L7.58887 8.96957V8.96923Z' id='a'/%3E%3C/defs%3E%3Cg stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'%3E%3Cg%3E%3Cmask fill='white'%3E%3Cuse xlink:href='%23a'/%3E%3C/mask%3E%3Cuse fill='dimgray' xlink:href='%23a'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full px-4 mt-4 justify-between gap-4 sm:hidden">
          <div className="">
            <button
              onClick={() => {
                setBgIsBlackFooter(false);
                handleScroll(0);
                setPageIs("legals");
              }}
            >
              {legals}
            </button>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/vincent-machado-da-luz-550a942a2/overlay/about-this-profile/"
              target="_blank"
              className="transition duration-150"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#a)">
                  <path
                    d="M15.546 0H2.455A2.455 2.455 0 0 0 0 2.455v13.09A2.455 2.455 0 0 0 2.455 18h13.09A2.455 2.455 0 0 0 18 15.546V2.455A2.455 2.455 0 0 0 15.546 0Zm-9.41 14.245a.38.38 0 0 1-.38.38H4.14a.38.38 0 0 1-.38-.38v-6.78a.38.38 0 0 1 .38-.38h1.617a.38.38 0 0 1 .38.38v6.78ZM4.948 6.443a1.534 1.534 0 1 1 0-3.068 1.534 1.534 0 0 1 0 3.068Zm9.64 7.828a.348.348 0 0 1-.35.35H12.5a.35.35 0 0 1-.35-.35v-3.175c0-.475.14-2.079-1.24-2.079-1.07 0-1.287 1.098-1.33 1.59v3.668a.35.35 0 0 1-.345.35h-1.68a.35.35 0 0 1-.348-.35V7.436a.349.349 0 0 1 .349-.35h1.68a.35.35 0 0 1 .349.35v.591c.397-.596.985-1.054 2.24-1.054 2.78 0 2.761 2.596 2.761 4.021l.002 3.277Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="currentColor" d="M0 0h18v18H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              className="transition duration-150"
            >
              <svg
                width="17"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#a)">
                  <path
                    d="M10.117 7.694 16.446.499h-1.5L9.451 6.746 5.062.499H0l6.637 9.447L0 17.49h1.5l5.803-6.597 4.635 6.597H17l-6.883-9.796Zm-2.054 2.335-.672-.94-5.35-7.486h2.303l4.318 6.04.672.941 5.613 7.852h-2.304l-4.58-6.407Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path
                      fill="currentColor"
                      transform="translate(0 .5)"
                      d="M0 0h17v17H0z"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
