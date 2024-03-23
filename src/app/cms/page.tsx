"use client";

import React, { useState } from "react";

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

  return (
    <>
      <JsonEditor json={editJson} onChange={setEditJson} />
      <button onClick={handleSubmit}>Submit Changes</button>
    </>
  );
};

export default CMS;
