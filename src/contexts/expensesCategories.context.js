import React, { useState, createContext } from "react";

export const ExpensesCategoriesContext = createContext({});

export const ExpensesCategoriesContextProvider = ({ children }) => {
  const [expensesCategories, setExpensesCategories] = useState(null);

  return (
    <ExpensesCategoriesContext.Provider
      value={{
        expensesCategories,
        setExpensesCategories
      }}
    >
      {children}
    </ExpensesCategoriesContext.Provider>
  );
};
