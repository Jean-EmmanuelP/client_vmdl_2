import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const loadData = async () => {
    try {
      const data = require("../../app/cms/content.json");
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
