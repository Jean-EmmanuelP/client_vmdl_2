"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReversedArrow from "../assets/svg/reverseArrow";

type JsonValue = string | number | boolean | null | JsonData;
type JsonData = { [key: string]: JsonValue } | JsonValue[];

interface JsonEditorProps {
  json: JsonData;
  onChange: (updatedJson: JsonData) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ json, onChange }) => {
  const [openObjects, setOpenObjects] = useState<Record<string, boolean>>({});
  useEffect(() => {
    setOpenObjects((prev) => {
      const newKeys = Object.keys(json).reduce<Record<string, boolean>>(
        (keys, key) => {
          if (!prev.hasOwnProperty(key)) {
            keys[key] = false;
          }
          return keys;
        },
        {}
      );
      return { ...prev, ...newKeys };
    });
  }, [json]);

  const toggleOpen = (key: string) => {
    setOpenObjects((prev) => ({ ...prev, [key]: !prev[key] }));
  };
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
      return Object.entries(currentJson).map(([key, value], index) => {
        const isFirstLevelButNotFirstItem =
          basePath.length === 0 && index !== 0;
        const style = isFirstLevelButNotFirstItem
          ? {
              borderTop: "2px solid black",
              marginTop: "10px",
              paddingTop: "20px",
            }
          : { paddingBottom: "10px" };
        const isOpen = openObjects[key];
        const marginLeft = `${basePath.length * 20}px`;
        return (
          <div
            key={key}
            style={{
              ...style,
              marginLeft,
            }}
            className="m-2"
          >
            <div onClick={() => toggleOpen(key)}>
              {isOpen ? "▼" : "▶"} <strong>{key}</strong>
            </div>
            {isOpen && renderEditor(value, basePath.concat(key))}
          </div>
        );
      });
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
  const [editJson, setEditJson] = useState<JsonData>(initialJson);
  const router = useRouter();
  const [goBack, setGoBack] = useState(false);
  const [hasValidatedToken, setHasValidatedToken] = useState(false);
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
    setHasValidatedToken(true);
  };
  useEffect(() => {
    validateToken();
  }, []);
  useEffect(() => {
    if (goBack) {
      router.push("/");
    }
  }, [goBack]);
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

  /*
    1. comprendre comment separer chaque langue [done]
    2. comprendre comment scroll vers la langue que l'on a choisit [done]
    3. styliser les input avec du padding
    4. avoir la possibilite de fermer lobjet
  */
  if (!hasValidatedToken) {
    return (
      <div className="relative cursor-default flex flex-col items-center justify-center p-6 h-full overflow-hidden bg-gradient-to-b from-black to-gray-900" />
    );
  }
  return (
    <>
      <div className="relative cursor-default flex flex-col items-center justify-center p-6 h-full overflow-hidden bg-gradient-to-b from-black to-gray-900">
        <div
          className="absolute flex items-center justify-center pr-1 sm:pr-2 bg-blanc rounded-full w-10 h-10 sm:w-20 sm:h-20 top-8 left-4 sm:top-8 sm:left-8"
          onClick={() => setGoBack(true)}
        >
          <ReversedArrow />
        </div>
        <div className="h-[50vh] relative flex flex-col border-1 border border-[#333] shadow-md w-full sm:w-[80%] overflow-y-auto bg-blanc p-4 rounded-xl">
          <div className="sm:mt-1 w-full text-center font-bold">
            <h1 className="text-sm sm:text-base">
              Gestion du contenu du site VMDL
            </h1>
            <div className="group flex absolute top-0 left-0 sm:top-1 group sm:left-1 translate-x-1/2 translate-y-1/2 bg-blanc border-1 border border-[#333]/40 shadow-2xl transition duration-75 hover:scale-105 font-light items-center justify-center p-3 sm:p-4 text-sm sm:text-base rounded-full w-2 h-2 sm:w-4 sm:h-4">
              <p className="sm:group-hover:rotate-[10deg] sm:group-hover:font-medium transition duration-700">
                i
              </p>
              <div className="w-[300px] absolute left-10 top-4 hidden group-hover:block bg-blanc border border-grey-500/20 p-2 text-sm">
                Pour modifier le contenu du site, veuillez éditer les champs
                ci-dessous et appuyer sur le boutton{" "}
                <span className="font-medium">
                  &quot;Appliquer les modifications&quot;{" "}
                </span>{" "}
                . Une fois les modifications appliquées, elles seront{" "}
                <span className="underline">
                  visibles immediatement sur le site
                </span>
                .
              </div>
            </div>
          </div>
          <div className="pt-6 pl-4 overflow-y-auto w-full scroll-smooth">
            <JsonEditor json={editJson} onChange={setEditJson} />
          </div>
        </div>
        <button
          className="cursor-pointer mt-4 sm:mt-8 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          onClick={handleSubmit}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Appliquer les modifications
          </span>
        </button>
      </div>
    </>
  );
};

export default CMS;
