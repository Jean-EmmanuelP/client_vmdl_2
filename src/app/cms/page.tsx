"use client";

import React, { useState, useEffect } from "react";
import contentData from "./content.json";

type JsonDataType = typeof contentData;
type LanguageKeys = keyof JsonDataType;
type SectionKeys = keyof JsonDataType[LanguageKeys];
type SubSectionKeys = string | null;
type ElementKeys = string | null;
type SubSubSectionKeys = string | null;

export default function CMS() {
  const [language, setLanguage] = useState<LanguageKeys>("fr");
  const [jsonData, setJsonData] = useState<JsonDataType>(contentData);
  const [selectedSection, setSelectedSection] = useState<SectionKeys>("header");
  const [selectedSubSection, setSelectedSubSection] =
    useState<SubSectionKeys>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<ElementKeys>(null);
  const [newValue, setNewValue] = useState<string>("");
  const [selectedSubSubSection, setSelectedSubSubSection] = useState<SubSubSectionKeys>(null);
  const [titleOrContent, setTitleOrContent] = useState<"title" | "content">("title");

  useEffect(() => {
    updateSubSections(selectedSection);
  }, [selectedSection, language]);

  const updateSubSections = (section: SectionKeys) => {
    const sectionData = jsonData[language][section];
    const firstSubSectionKey =
      typeof sectionData === "object" ? getFirstKey(sectionData) : null;
    setSelectedSubSection(firstSubSectionKey);
    updateElements(section, firstSubSectionKey);
  };

  const updateElements = (section: SectionKeys, subSection: SubSectionKeys) => {
    const subSectionData = subSection
      ? (jsonData[language][section] as any)[subSection]
      : null;
    if (subSectionData && typeof subSectionData === "object") {
      const firstElementKey = getFirstKey(subSectionData);
      setSelectedElement(firstElementKey);
      setSelectedSubSubSection(firstElementKey); // Nouvelle ligne pour gérer la sous-sous-section
    } else {
      setSelectedElement(null);
      setSelectedSubSubSection(null); // Nouvelle ligne pour gérer la sous-sous-section
    }
  };

  const getFirstKey = <T extends object>(data: T) => {
    const keys = Object.keys(data);
    return keys.length > 0 ? keys[0] : null;
  };

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSection(e.target.value as SectionKeys);
  };

  const handleSubSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubSection(e.target.value);
    updateElements(selectedSection, e.target.value);
  };

  const handleElementChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedElement(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const handleSubmit = async () => {
    const updatedJsonData = { ...jsonData };
    
    // Si une sous-sous-section est sélectionnée, mettez à jour son titre et son contenu
    if (selectedElement && selectedSubSection && selectedSubSubSection) {
      // Accédez à la sous-sous-section et mettez à jour ses propriétés
      const subSectionData = (updatedJsonData[language][selectedSection] as any)[selectedSubSection];
      if (subSectionData && typeof subSectionData === "object" && subSectionData[selectedSubSubSection]) {
        subSectionData[selectedSubSubSection].title = newTitle;
        subSectionData[selectedSubSubSection].content = newContent;
      }
    // Sinon, si seulement une sous-section est sélectionnée, mettez à jour sa valeur
    } else if (selectedElement && selectedSubSection) {
      ((updatedJsonData[language][selectedSection] as any)[selectedSubSection] as any)[selectedElement] = newValue;
    } else if (selectedSubSection) {
      (updatedJsonData[language][selectedSection] as any)[selectedSubSection] = newValue;
    }
  
    setJsonData(updatedJsonData);
  
    // Ici, vous pouvez conserver le code pour la sauvegarde des données comme il est
    console.log(`this is the jsonData sent to the save-content route:`, updatedJsonData);
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJsonData), // Assurez-vous d'envoyer les données mises à jour
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
  
      alert("Données sauvegardées !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données", error);
    }
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageKeys);
  };

  return (
    <div className="cursor-default bg-blanc bg-cover w-full h-full flex justify-center items-center">
      <div className="backdrop-blur-xl bg-cyan-500/20 flex flex-col justify-center gap-10 p-10 w-fit h-fit rounded-md shadow-2xl">
        <div className="p-2 font-bold underline">
          Content Management System
        </div>
        <select
          value={language}
          className="p-2 rounded-md"
          onChange={handleLanguageChange}
        >
          {Object.keys(jsonData).map((langKey) => (
            <option key={langKey} value={langKey}>
              {langKey.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={selectedSection}
          className="p-2 rounded-md"
          onChange={handleSectionChange}
        >
          {Object.keys(jsonData.fr).map((key) => (
            <option key={key} className="p-1 border" value={key}>
              {key}
            </option>
          ))}
        </select>

        {selectedSubSection &&
          typeof jsonData.fr[selectedSection] === "object" && (
            <select
              className="p-2 rounded-md"
              value={selectedSubSection || undefined}
              onChange={handleSubSectionChange}
            >
              {Object.keys(jsonData.fr[selectedSection]).map((subKey) => (
                <option key={subKey} className="p-1 border" value={subKey}>
                  {subKey}
                </option>
              ))}
            </select>
          )}

        {selectedElement &&
          selectedSubSection &&
          typeof (jsonData.fr[selectedSection] as any)[selectedSubSection] ===
          "object" && (
            <select
              className="p-2 rounded-md"
              value={selectedElement || undefined}
              onChange={handleElementChange}
            >
              {Object.keys(
                (jsonData.fr[selectedSection] as any)[selectedSubSection]
              ).map((elementKey) => (
                <option
                  key={elementKey}
                  className="p-1 border"
                  value={elementKey}
                >
                  {elementKey}
                </option>
              ))}
            </select>
          )}
        {selectedSubSubSection && (
          <>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </>
        )}

        <input
          type="text"
          className="rounded-md p-1"
          value={newValue}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="cursor-pointer transition duration-150 hover:scale-105 rounded-md p-2 shadow-md text-xs sm:text-base bg-black text-white font-bold hover:text-green-500"
        >
          Save
        </button>
      </div>
    </div>
  );


}
