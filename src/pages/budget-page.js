import React, { useContext, useEffect } from "react";
import { ExpensesCategoriesContext } from "../contexts/expensesCategories.context";
import useFetchData from "../hooks/useFetchData";

const BudgetPage = () => {
  const { categories, setCategories } = useContext(ExpensesCategoriesContext);
  const [fetchedCategories, doFetchCategories] = useFetchData("");

  useEffect(() => {
    const fetchCategories = () => {
      doFetchCategories(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/user`
      );
      if (fetchedCategories.data) {
        setCategories(fetchedCategories.data.expensesCategories);
      }
    };
    if (!categories) {
      fetchCategories();
    }
  }, [fetchedCategories.data]);

  return <div>Budget page</div>;
};

export default BudgetPage;
