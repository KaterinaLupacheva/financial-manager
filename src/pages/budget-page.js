import React, { useState, useContext, useEffect } from "react";
import { ExpensesCategoriesContext } from "../contexts/expensesCategories.context";
import useFetchData from "../hooks/useFetchData";
import {
  sumPerCatogyForCurMonth,
  colorsForCharts
} from "../utils/transform-data.utils";
import BudgetBar from "../components/budget-bar";
import BudgetDialog from "../components/budget-dialog";
import { Typography } from "@material-ui/core";
import { StyledButton } from "../styles/button.styles";
import { useTheme } from "@material-ui/core/styles";
import SimpleBackdrop from "../components/simple-backdrop";
import axios from "axios";
import { format } from "date-fns";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const BudgetPage = () => {
  const theme = useTheme();
  const { expensesCategories, setExpensesCategories } = useContext(
    ExpensesCategoriesContext
  );
  const [fetchedCategories, doFetchCategories] = useFetchData("");
  const [fetchedCurMonthExpenses, doFetchCurMonthExpenses] = useFetchData("");
  const [budgetData, setBudgetData] = useState(null);
  const [emptyCategories, setEmptyCategories] = useState(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editBudget = item => {
    setEditData({
      ...editData,
      category: item.category,
      sum: item.budget
    });
    setOpen(true);
  };

  const deleteBudget = item => {
    const tempObject = {
      ...expensesCategories,
      [item.category]: ""
    };
    const reqBody = {
      expensesCategories: tempObject
    };
    axios
      .post(
        `${BASE_URL}/user`,
        reqBody
      )
      .then(res => {
        handleSubmit();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleSubmit = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchExpensesCategories = () => {
      doFetchCategories(
        `${BASE_URL}/user`
      );
      if (fetchedCategories.data) {
        setExpensesCategories(fetchedCategories.data.expensesCategories);
      }
    };

    const fetchCurrentMonthExpenses = () => {
      const monthYear = format(new Date(), "MMM-yyyy");
      doFetchCurMonthExpenses(
        `${BASE_URL}/month/${monthYear}`
      );
    };

    fetchCurrentMonthExpenses();

    if (!expensesCategories) {
      fetchExpensesCategories();
    }

    if (expensesCategories && fetchedCurMonthExpenses.data) {
      const categoriesNames = Object.keys(expensesCategories);

      const sumPerCategory = sumPerCatogyForCurMonth(
        fetchedCurMonthExpenses.data.expenses
      );

      //create data for budget
      let tempData = [];
      let tempEmptyCategories = [];
      categoriesNames.forEach((category, idx) => {
        if (expensesCategories[category]) {
          tempData.push({
            category,
            spent: sumPerCategory[category] ? sumPerCategory[category] : 0,
            budget: expensesCategories[category],
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
    expensesCategories
  ]);

  return (
    <>
      {fetchedCategories.isError || fetchedCurMonthExpenses.isError ? (
        <div>Something went wrong...</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
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
            editData={editData}
            handleSubmit={handleSubmit}
          />
          {budgetData &&
            budgetData.map((item, id) => (
              <BudgetBar
                key={id}
                data={item}
                editBudget={editBudget}
                deleteBudget={deleteBudget}
              />
            ))}
        </div>
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
