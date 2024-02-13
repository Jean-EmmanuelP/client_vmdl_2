// DataContext.js
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  // Chargez vos données ici ou fournissez une fonction pour le faire
  const loadData = async () => {
    try {
      const response = await fetch("/api/take-content");
      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, loadData }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de données
export const useData = () => useContext(DataContext);
