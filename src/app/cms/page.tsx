"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type JsonValue = string | number | boolean | null | JsonData;
type JsonData = { [key: string]: JsonValue } | JsonValue[];

interface JsonEditorProps {
  json: JsonData;
  onChange: (updatedJson: JsonData) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange }) => {
  const handleValueChange = (path: string[], value: JsonValue) => {
    const updateJson = (
      currentJson: JsonValue,
      pathIndex: number
    ): JsonValue => {
      if (pathIndex >= path.length) return value;

      const currentPath = path[pathIndex];

      if (typeof currentJson === "object" && currentJson !== null) {
        if (Array.isArray(currentJson)) {
          const index = parseInt(currentPath, 10);
          const updatedArray = [...currentJson];
          updatedArray[index] = updateJson(currentJson[index], pathIndex + 1);
          return updatedArray;
        } else {
          const updatedObject = {
            ...currentJson,
            [currentPath]: updateJson(
              currentJson[currentPath as keyof typeof currentJson],
              pathIndex + 1
            ),
          };
          return updatedObject;
        }
      } else {
        throw new Error("Path is invalid");
      }
    };

    onChange(updateJson(json, 0) as JsonData);
  };

  const renderEditor = (
    currentJson: JsonValue,
    basePath: string[] = []
  ): React.ReactNode => {
    if (typeof currentJson === "object" && currentJson !== null) {
      return Object.entries(currentJson).map(([key, value]) => (
        <div key={key} style={{ marginLeft: "20px" }}>
          <strong>{key}:</strong> {renderEditor(value, basePath.concat(key))}
        </div>
      ));
    } else {
      return (
        <input
          type="text"
          value={String(currentJson)}
          className="w-full"
          onChange={(e) => handleValueChange(basePath, e.target.value)}
        />
      );
    }
  };

  return <div>{renderEditor(json)}</div>;
};

const CMS: React.FC = () => {
  const initialJson: JsonData = require("./content.json");
  const [json, setJson] = useState<JsonData>(initialJson);
  {
    /*
    2. have a better UI & UX
   */
  }
  const [editJson, setEditJson] = useState<JsonData>(initialJson);
  const handleSubmit = async () => {
    console.log(editJson);
    setJson(editJson);
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editJson),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      alert("Données sauvegardées !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données", error);
    }
  };
  const validateToken = async () => {
    const token = sessionStorage.getItem("authToken");
    const router = useRouter();
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      const response = await fetch("/api/check-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Token validation failed");
      }
    } catch (error) {
      sessionStorage.removeItem("authToken");
      router.push("/");
    }
  };
  validateToken();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/take-content");
      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      const data = await response.json();
      setEditJson(data);
    }
    fetchData();
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollToPercentage = (percentage: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollPosition = (percentage / 1000) * container.scrollHeight;
      container.scrollTop = scrollPosition;
    }
  };
  const langues = ["fr", "en", "عربي", "de", "pt", "es", "it", "中文"];
  /*
    1. comprendre comment separer chaque langue
    2. comprendre comment scroll vers la langue que l'on a choisit
  */
  return (
    <>
      <div className="bg-blanc cursor-default flex flex-col items-center justify-center p-6 max-h-[100vh] overflow-hidden">
        <div className="relative flex flex-col border-1 border shadow-md w-full overflow-y-auto bg-black/10 p-4">
          <div className="w-full text-center font-bold">
            <h1>Gestion du contenu du site VMDL</h1>
            <div className="group flex absolute top-0 left-0 sm:top-1 sm:left-1 translate-x-1/2 translate-y-1/2 bg-blanc border-1 border border-gray-500/20 shadow-2xl transition duration-75 hover:scale-105 font-light items-center justify-center p-3 sm:p-4 text-sm sm:text-base rounded-full w-2 h-2 sm:w-4 sm:h-4">
              i
              <div className="w-[300px] absolute left-10 top-4 hidden group-hover:block bg-blanc border border-grey-500/20 p-2 text-sm">
                Pour modifier le contenu du site, veuillez éditer les champs
                ci-dessous et appuyer sur le boutton{" "}
                <span className="font-medium">
                  "Appliquer les modifications"{" "}
                </span>{" "}
                . Une fois les modifications appliquées, elles seront{" "}
                <span className="underline">
                  visibles immediatement sur le site
                </span>
                .
              </div>
            </div>
          </div>
          <div className="border-b border-black/20 border-1 pt-4 sm:pt-8 mx-8 sm:mx-2"></div>
          <div className="flex items-center justify-center sm:justify-normal gap-2 pt-4 sm:pt-6 pl-4">
            <p className="hidden sm:block font-medium">
              Choisis la langue que tu souhaites modifier :
            </p>
            <div className="flex gap-1 sm:gap-4">
              {[0, 40, 50, 75, 100, 131.5, 150, 175].map(
                (percentage, index, array) => (
                  <React.Fragment key={index}>
                    <div
                      className="cursor-pointer transition duration-50 hover:font-semibold"
                      onClick={() => scrollToPercentage(percentage)}
                    >
                      {langues[index]}
                    </div>
                    {index + 1 !== array.length && (
                      <div className="text-center">|</div>
                    )}
                  </React.Fragment>
                )
              )}
            </div>
          </div>
          <div className="border-b border-black/20 border-1 pt-4 sm:pt-6 mx-8 sm:mx-2"></div>
          <div
            ref={scrollContainerRef}
            className="pt-6 pl-4 overflow-y-auto w-full h-full scroll-smooth"
          >
            <JsonEditor json={editJson} onChange={setEditJson} />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-8 p-4 rounded-md border border-gray-500/20 shadow-2xl flex items-center justify-center bg-teal-300 transition duration-150 hover:scale-105 hover:underline cursor-pointer"
        >
          Appliquer les modifications
        </button>
      </div>
    </>
  );
};

export default CMS;
