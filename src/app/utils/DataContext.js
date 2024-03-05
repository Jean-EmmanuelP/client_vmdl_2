import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

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

export const useData = () => useContext(DataContext);
