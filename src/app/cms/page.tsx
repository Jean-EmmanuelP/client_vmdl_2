"use client";

import React, { useState, useEffect } from "react";
import contentData from "./content.json";

type JsonDataType = typeof contentData;
type LanguageKeys = keyof JsonDataType;
type SectionKeys = keyof JsonDataType[LanguageKeys];
type SubSectionKeys = string | null;
type ElementKeys = string | null;

export default function CMS() {
  const [language, setLanguage] = useState<LanguageKeys>("fr"); // État pour la langue sélectionnée
  const [jsonData, setJsonData] = useState<JsonDataType>(contentData);
  const [selectedSection, setSelectedSection] = useState<SectionKeys>("header");
  const [selectedSubSection, setSelectedSubSection] =
    useState<SubSectionKeys>(null);
  const [selectedElement, setSelectedElement] = useState<ElementKeys>(null);
  const [newValue, setNewValue] = useState<string>("");

  useEffect(() => {
    updateSubSections(selectedSection);
  }, [selectedSection, language]); // Ajouter 'language' comme dépendance

  const updateSubSections = (section: SectionKeys) => {
    const sectionData = jsonData[language][section]; // Utiliser 'language' pour accéder aux données
    const firstSubSectionKey =
      typeof sectionData === "object" ? getFirstKey(sectionData) : null;
    setSelectedSubSection(firstSubSectionKey);
    updateElements(section, firstSubSectionKey);
  };

  const updateElements = (section: SectionKeys, subSection: SubSectionKeys) => {
    const subSectionData = subSection
      ? (jsonData[language][section] as any)[subSection]
      : null; // Utiliser 'language'
    if (subSectionData && typeof subSectionData === "object") {
      const firstElementKey = getFirstKey(subSectionData);
      setSelectedElement(firstElementKey);
    } else {
      setSelectedElement(null);
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
    if (selectedElement && selectedSubSection) {
      // Utilisation de 'as any' pour accéder dynamiquement aux propriétés de l'objet
      (
        (updatedJsonData[language][selectedSection] as any)[
          selectedSubSection
        ] as any
      )[selectedElement] = newValue;
    } else if (selectedSubSection) {
      (updatedJsonData[language][selectedSection] as any)[selectedSubSection] =
        newValue;
    }
    setJsonData(updatedJsonData);

    console.log(
      `this is the jsonData sended to the save-content route:`,
      updatedJsonData
    );
    try {
      // Envoi des données au serveur, regler ce probleme, faire le save-content
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // Gérer la réponse de succès ici...
      alert("Données sauvegardées !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données", error);
      // Gérer l'erreur ici...
    }
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageKeys);
  };

  return (
    <div className="cursor-default bg-blanc bg-cover w-full h-full flex justify-center items-center">
      <div className="backdrop-blur-xl bg-cyan-500/20 flex flex-col justify-center gap-10 p-10 w-1/3 h-1/2 rounded-md shadow-2xl">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:font-bold sm:text-2xl text-center">
          CMS
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
