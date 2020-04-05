import React, { useState, createContext } from "react";

export const CurrentMonthExpensesContext = createContext();

export const CurrentMonthExpensesContextProvider = ({ children }) => {
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(null);

  return (
    <CurrentMonthExpensesContext.Provider
      value={{
        currentMonthExpenses,
        setCurrentMonthExpenses
      }}
    >
      {children}
    </CurrentMonthExpensesContext.Provider>
  );
};
