import Paragraph from "../Components/Paragraph";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function Vision() {
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
  const { title, content, button, content_after_clicking_button } = data[langCode].section_4
  return (
    <div
      id="Vision"
      className="w-full h-full flex justify-center relative items-center gap-4 bg-blanc"
    >
      <Paragraph textColor="#030303">
        <span className="uppercase text-[30px] sm:text-[60px] font-light">{title}</span>
        <span className="text-[16px] sm:text-[24px] sm:content font-light leading-4 sm:leading-[26px]">
          {content}
        </span>
        <span className="text-sm">{button}</span>
        <span className="text-[16px] sm:text-[24px] sm:content leading-[26px] font-light">
          {content_after_clicking_button}
        </span>
      </Paragraph>
    </div>
  );
}
