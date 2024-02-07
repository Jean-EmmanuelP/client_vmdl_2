import Paragraph from "../Components/Paragraph"
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext";

export default function Cabinet() {
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
	const { title, content, button, content_after_clicking_button  } = data[langCode].section_2;
	return (
		<div
			id="Cabinet"
			className="w-full h-full flex justify-center items-center gap-4 z-10"
		>
			<Paragraph bgColor="#F9F9F9" textColor="#030303" section={1}>
				<span className="uppercase text-[40px] sm:text-[60px] sm:title font-light">{title}</span>
				<span className="text-[20px] sm:text-[24px] sm:content leading-[26px] font-light">{content}</span>
				<span className="text-sm">{button}</span>
				<span className="text-[20px] sm:text-[24px] sm:content leading-[26px] font-light">{content_after_clicking_button}</span>
			</Paragraph>
		</div>
	)
}