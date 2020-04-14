import React, { useState, createContext } from "react";

export const MonthDataContext = createContext();

export const MonthDataContextProvider = ({ children }) => {
  const [monthData, setMonthData] = useState(null);

  return (
    <MonthDataContext.Provider
      value={{
        monthData,
        setMonthData
      }}
    >
      {children}
    </MonthDataContext.Provider>
  );
};
