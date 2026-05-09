"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReversedArrow from "../assets/svg/reverseArrow";
import ArticlesManager, { Article } from "./ArticlesManager";
import DraftsQueue from "./DraftsQueue";

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

type Tab = "content" | "articles" | "drafts";

const CMS: React.FC = () => {
  const initialJson: JsonData = require("./content.json");
  const [json, setJson] = useState<JsonData>(initialJson);
  const [editJson, setEditJson] = useState<JsonData>(initialJson);
  const router = useRouter();
  const [goBack, setGoBack] = useState(false);
  const [hasValidatedToken, setHasValidatedToken] = useState(false);
  const [tab, setTab] = useState<Tab>("content");
  const [saving, setSaving] = useState(false);
  const [draftCount, setDraftCount] = useState<number | null>(null);

  const articles: Article[] = Array.isArray(
    (editJson as Record<string, unknown>)?.articles
  )
    ? ((editJson as Record<string, unknown>).articles as Article[])
    : [];

  const setArticles = (next: Article[]) => {
    setEditJson((prev) => {
      const obj =
        typeof prev === "object" && prev !== null && !Array.isArray(prev)
          ? (prev as Record<string, unknown>)
          : {};
      return { ...obj, articles: next } as unknown as JsonData;
    });
  };

  const handleSubmit = async () => {
    setJson(editJson);
    setSaving(true);
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editJson),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      alert(
        "Modifications sauvegardées ! Le site sera mis à jour dans quelques minutes."
      );
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données", error);
      alert("Erreur lors de la sauvegarde. Réessayez dans un instant.");
    } finally {
      setSaving(false);
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
        headers: { Authorization: `Bearer ${token}` },
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
      // Ensure articles array exists
      if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        if (!Array.isArray((data as Record<string, unknown>).articles)) {
          (data as Record<string, unknown>).articles = [];
        }
      }
      setEditJson(data);
    }
    fetchData();
  }, []);

  if (!hasValidatedToken) {
    return (
      <div className="relative cursor-default flex flex-col items-center justify-center p-6 h-full overflow-hidden bg-gradient-to-b from-black to-gray-900" />
    );
  }

  // Render content.json without the articles key (managed in dedicated tab)
  const contentForJsonEditor: JsonData = (() => {
    if (
      typeof editJson === "object" &&
      editJson !== null &&
      !Array.isArray(editJson)
    ) {
      const { articles: _omit, ...rest } = editJson as Record<string, unknown>;
      return rest as unknown as JsonData;
    }
    return editJson;
  })();

  const onJsonContentChange = (updated: JsonData) => {
    setEditJson((prev) => {
      const prevObj =
        typeof prev === "object" && prev !== null && !Array.isArray(prev)
          ? (prev as Record<string, unknown>)
          : {};
      const updatedObj =
        typeof updated === "object" && updated !== null && !Array.isArray(updated)
          ? (updated as Record<string, unknown>)
          : {};
      return {
        ...prevObj,
        ...updatedObj,
        articles: prevObj.articles ?? [],
      } as unknown as JsonData;
    });
  };

  return (
    <div className="relative cursor-default flex flex-col items-center justify-start p-4 sm:p-6 min-h-full overflow-y-auto bg-gradient-to-b from-black to-gray-900">
      <div
        className="absolute flex items-center justify-center pr-1 sm:pr-2 bg-blanc w-10 h-10 sm:w-20 sm:h-20 top-8 left-4 sm:top-8 sm:left-8 cursor-pointer z-10"
        onClick={() => setGoBack(true)}
      >
        <ReversedArrow />
      </div>

      <div className="w-full sm:w-[80%] mt-24 sm:mt-32">
        <div className="text-center mb-4">
          <h1 className="text-blanc text-base sm:text-xl font-bold uppercase tracking-wider">
            Gestion du contenu du site VMDL
          </h1>
        </div>

        <div className="flex bg-blanc/10 p-1 rounded-md mb-4 max-w-lg mx-auto">
          <button
            onClick={() => setTab("content")}
            className={`flex-1 px-4 py-2 text-xs sm:text-sm uppercase tracking-wider transition ${
              tab === "content"
                ? "bg-blanc text-noir"
                : "text-blanc hover:bg-blanc/10"
            }`}
          >
            Contenu du site
          </button>
          <button
            onClick={() => setTab("articles")}
            className={`flex-1 px-4 py-2 text-xs sm:text-sm uppercase tracking-wider transition ${
              tab === "articles"
                ? "bg-blanc text-noir"
                : "text-blanc hover:bg-blanc/10"
            }`}
          >
            Articles ({articles.length})
          </button>
          <button
            onClick={() => setTab("drafts")}
            className={`flex-1 px-4 py-2 text-xs sm:text-sm uppercase tracking-wider transition relative ${
              tab === "drafts"
                ? "bg-blanc text-noir"
                : "text-blanc hover:bg-blanc/10"
            }`}
          >
            Brouillons IA{draftCount !== null && ` (${draftCount})`}
            {draftCount !== null && draftCount > 0 && tab !== "drafts" && (
              <span className="absolute top-1 right-2 inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
        </div>

        <div className="relative flex flex-col border border-[#333] shadow-md w-full bg-blanc p-4 sm:p-6 min-h-[60vh]">
          {tab === "content" && (
            <div className="overflow-y-auto w-full">
              <p className="text-xs sm:text-sm text-noir/70 mb-3 border-l-2 border-noir/30 pl-3">
                Pour modifier le contenu : éditez les champs ci-dessous puis
                appuyez sur <strong>Appliquer les modifications</strong>. Pour
                sauter une ligne, mettez 2 espaces (4 espaces = 2 lignes).
              </p>
              <JsonEditor
                json={contentForJsonEditor}
                onChange={onJsonContentChange}
              />
            </div>
          )}
          {tab === "articles" && (
            <ArticlesManager articles={articles} onChange={setArticles} />
          )}
          {tab === "drafts" && (
            <DraftsQueue onCount={(n) => setDraftCount(n)} />
          )}
        </div>

        {tab !== "drafts" && (
          <div className="flex justify-center mt-6 mb-10">
            <button
              disabled={saving}
              onClick={handleSubmit}
              className="cursor-pointer relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white disabled:opacity-50"
            >
              <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-white group-hover:bg-opacity-0">
                {saving ? "Sauvegarde…" : "Appliquer les modifications"}
              </span>
            </button>
          </div>
        )}
        {tab === "drafts" && <div className="mb-10" />}
      </div>
    </div>
  );
};

export default CMS;
