import React, { useState, useContext, useEffect } from "react";
import { ExpensesCategoriesContext } from "../contexts/expensesCategories.context";
import { CurrentMonthExpensesContext } from "../contexts/curMonthExpenses.context";
import useFetchData from "../hooks/useFetchData";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date.utils";
import {
  sumPerCatogyForCurMonth,
  colorsForCharts
} from "../utils/transform-data.utils";
import { CATEGORIES } from "../utils/categories";
import BudgetBar from "../components/budget-bar";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const BudgetPage = () => {
  const { categories, setCategories } = useContext(ExpensesCategoriesContext);
  const { currentMonthExpenses, setCurrentMonthExpenses } = useContext(
    CurrentMonthExpensesContext
  );
  const [fetchedCategories, doFetchCategories] = useFetchData("");
  const [fetchedCurMonthExpenses, doFetchCurMonthExpenses] = useFetchData("");
  const [budgetData, setBudgetData] = useState(null);

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

    if (categories && currentMonthExpenses) {
      //get all categories names
      // const categoriesNames = Object.keys(fetchedCategories.data.expensesCategories);

      //DELETE
      const categoriesNames = CATEGORIES.expenses;

      const sumPerCategory = sumPerCatogyForCurMonth(currentMonthExpenses);

      //create data for budget
      let tempData = [];
      categoriesNames.forEach((category, idx) => {
        if (categories[category]) {
          tempData.push({
            category,
            spent: sumPerCategory[category] ? sumPerCategory[category] : 0,
            budget: categories[category],
            barColor: colorsForCharts[idx]
          });
        }
      });
      setBudgetData(tempData);
    }
  }, [
    fetchedCurMonthExpenses.data,
    fetchedCategories.data,
    categories,
    currentMonthExpenses
  ]);

  return (
    <>
      <div>Budget page</div>
      <Button variant="contained">
        <Typography>{"Add new budget"}</Typography>
      </Button>
      {budgetData &&
        budgetData.map((item, id) => <BudgetBar key={id} data={item} />)}
    </>
  );
};

export default BudgetPage;
