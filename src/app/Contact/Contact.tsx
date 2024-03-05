"use client"

import FormContact from "../Components/Form";
import { LangueCode, useSection } from "../utils/Contextboard";
import { useData } from "../utils/DataContext"; 

export default function Contact() {
  const { data } = useData();
  const { langueCourante } = useSection();

  if (!data) {
    return null;
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
  const { title } = data[langCode].contact;
  return (
    <section
      id="Contact"
      className="relative w-full h-full flex justify-center z-10 items-center"
    >
      <div className="w-full h-full flex justify-center items-center bg-blanc mb-20 sm:mb-0">
        <div className="flex flex-col w-[45%]">
          <h1 className="uppercase text-center py-4 text-2xl mt-[-50px] text-[30px] sm:text-[40px] sm:title font-light">
            {title}
          </h1>
          <FormContact></FormContact>
        </div>
      </div>
    </section>
  );
}
