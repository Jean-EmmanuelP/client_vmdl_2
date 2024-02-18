import Paragraph from "../Components/Paragraph";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function Fondateur() {
  const { data } = useData();
  const { langueCourante } = useSection();
  if (!data) {
    return;
  }
  const langCodeMap: { [key in LangueCode]: string } = {
    FR: 'fr',
    EN: 'en',
    IT: 'it',
    ES: 'es',
    عربي: 'عربي',
    PT: 'pt',
    DE: 'de',
	中文: '中文'
  };
const langCode = langCodeMap[langueCourante as LangueCode] || langCodeMap['FR'];
  const { title, content } = data[langCode].section_5;
  return (
    <div
      id="Fondateur"
      className="relative w-full h-full flex justify-center items-center z-10 bg-noir"
    >
      <Paragraph textColor="#F9F9F9">
        <span className="uppercase text-[40px] sm:text-[60px] sm:title font-light">{title}</span>
        <span className="text-[20px] sm:text-[24px] sm:content leading-[26px] font-light">
          {content}
        </span>
      </Paragraph>
    </div>
  );
}
