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
import BudgetDialog from "../components/budget-dialog";
import { Typography } from "@material-ui/core";
import { StyledButton } from "../styles/button.styles";
import { useTheme } from "@material-ui/core/styles";
import SimpleBackdrop from "../components/simple-backdrop";

const BudgetPage = () => {
  const theme = useTheme();
  const { categories, setCategories } = useContext(ExpensesCategoriesContext);
  const { currentMonthExpenses, setCurrentMonthExpenses } = useContext(
    CurrentMonthExpensesContext
  );
  const [fetchedCategories, doFetchCategories] = useFetchData("");
  const [fetchedCurMonthExpenses, doFetchCurMonthExpenses] = useFetchData("");
  const [budgetData, setBudgetData] = useState(null);
  const [emptyCategories, setEmptyCategories] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      let tempEmptyCategories = [];
      categoriesNames.forEach((category, idx) => {
        if (categories[category]) {
          tempData.push({
            category,
            spent: sumPerCategory[category] ? sumPerCategory[category] : 0,
            budget: categories[category],
            barColor: colorsForCharts[idx]
          });
        } else {
          tempEmptyCategories.push(category);
        }
      });
      setBudgetData(tempData);
      setEmptyCategories(tempEmptyCategories);
    }
  }, [
    fetchedCurMonthExpenses.data,
    fetchedCategories.data,
    categories,
    currentMonthExpenses
  ]);

  return (
    <>
      {fetchedCategories.isError || fetchedCurMonthExpenses.isError ? (
        <div>Something went wrong...</div>
      ) : (
        <>
          <StyledButton
            variant="contained"
            bgcolor={theme.palette.secondary.lightBg}
            onClick={handleClick}
          >
            <Typography>{"Add new budget"}</Typography>
          </StyledButton>
          <BudgetDialog
            open={open}
            handleClose={handleClose}
            emptyCategories={emptyCategories}
          />
          {budgetData &&
            budgetData.map((item, id) => <BudgetBar key={id} data={item} />)}
        </>
      )}
      <SimpleBackdrop
        open={
          fetchedCategories.isLoading || fetchedCurMonthExpenses.isLoading
            ? true
            : false
        }
      />
    </>
  );
};

export default BudgetPage;
