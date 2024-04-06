import Paragraph from "../Paragraph";
import { LangueCode, useSection } from "@/app/utils/Contextboard";
import { useData } from "@/app/utils/DataContext";

export default function Honoraires() {
  const { data } = useData();
  const { langueCourante } = useSection();
  if (!data) {
    return;
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
  const { title, content, button, content_after_clicking_button } =
    data[langCode].section_6;
  return (
    <section
      id="Honoraires"
      className="relative w-full h-full flex justify-center items-center gap-4  bg-blanc"
    >
      <Paragraph>
        <span className="uppercase text-[30px] sm:text-[40px] sm:title font-light">
          {title}
        </span>
        <span className="text-[16px] sm:text-[24px] sm:content leading-[26px] font-light">
          {content}
      </span>
      </Paragraph>
    </section>
  );
}
