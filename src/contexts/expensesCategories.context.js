import React, { useState, useEffect, createContext } from "react";

export const ExpensesCategoriesContext = createContext({});

export const ExpensesCategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  return (
    <ExpensesCategoriesContext.Provider
      value={{
        categories,
        setCategories
      }}
    >
      {children}
    </ExpensesCategoriesContext.Provider>
  );
};
