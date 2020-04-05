import React, { useContext, useEffect } from "react";
import { ExpensesCategoriesContext } from "../contexts/expensesCategories.context";
import { CurrentMonthExpensesContext } from "../contexts/curMonthExpenses.context";
import useFetchData from "../hooks/useFetchData";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date.utils";
import { sumPerCatogyForCurMonth } from "../utils/transform-data.utils";

const BudgetPage = () => {
  const { categories, setCategories } = useContext(ExpensesCategoriesContext);
  const { currentMonthExpenses, setCurrentMonthExpenses } = useContext(
    CurrentMonthExpensesContext
  );
  const [fetchedCategories, doFetchCategories] = useFetchData("");
  const [fetchedCurMonthExpenses, doFetchCurMonthExpenses] = useFetchData("");

  useEffect(() => {
    const fetchCategories = () => {
      doFetchCategories(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/user`
      );
      if (fetchedCategories.data) {
        setCategories(fetchedCategories.data.expensesCategories);
      }
    };

    const fetchCurrentMonthExpenses = () => {
      doFetchCurMonthExpenses(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/expenses/${getFirstDayOfMonth(
          new Date()
        )}/${getLastDayOfMonth(new Date())}`
      );
      if (fetchedCurMonthExpenses.data) {
        setCurrentMonthExpenses(fetchedCurMonthExpenses.data);
      }
    };
    if (!categories) {
      fetchCategories();
    }
    if (!currentMonthExpenses) {
      fetchCurrentMonthExpenses();
    }

    if (fetchedCurMonthExpenses.data) {
      const sumPerCategory = sumPerCatogyForCurMonth(
        fetchedCurMonthExpenses.data
      );
      console.log(
        "Sum per category " + JSON.stringify(sumPerCategory, null, 2)
      );
    }
  }, [fetchedCategories.data, fetchedCurMonthExpenses.data]);

  return <div>Budget page</div>;
};

export default BudgetPage;
