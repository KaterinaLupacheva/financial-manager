import React, { useEffect, useState, useContext } from "react";
import GroupedBarChart from "../components/charts/grouped-bar-chart";
import CategoriesBarChart from "../components/charts/categories-bar-chart";
import { getLastDayOfMonth } from "../utils/date.utils";
import SimpleBackdrop from "../components/simple-backdrop";
import useFetchData from "../hooks/useFetchData";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TabsBar from "../components/tabs-bar";
import ExpensesByCategories from "../components/expenses-by-categories";
import ExpensesContext from "../contexts/expenses.context";
import IncomeContext from "../contexts/income.context";
import {
  prepareDataForChart,
  prepareDataForCategoryChart
} from "../utils/transform-data.utils";

const ChartsPage = () => {
  const { expensesPeriodData, setExpensesPeriodData } = useContext(
    ExpensesContext
  );
  const { incomesPeriodData, setIncomesPeriodData } = useContext(IncomeContext);
  const [incomesDataForChart, setIncomesDataForChart] = useState({
    labels: [],
    incomes: []
  });
  const [expensesDataForChart, setExpensesDataForChart] = useState({
    labels: [],
    expenses: []
  });
  const [
    dataForIncomeCategoriesChart,
    setDataForIncomeCategoriesChart
  ] = useState({
    labels: [],
    datasets: []
  });
  const [
    dataForExpensesCategoriesChart,
    setDataForExpensesCategoriesChart
  ] = useState({
    labels: [],
    datasets: [],
    categories: []
  });
  const [incomes, doIncomesFetch] = useFetchData("");
  const [expenses, doExpensesFetch] = useFetchData("");

  useEffect(() => {
    const fetchExpensesData = () => {
      doExpensesFetch(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/expenses/2020-01-01/${getLastDayOfMonth(
          new Date()
        )}`
      );
      if (expenses.data) {
        setExpensesPeriodData(expenses.data);
      }
    };

    const fetchIncomesData = () => {
      doIncomesFetch(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/incomes/2020-01-01/${getLastDayOfMonth(
          new Date()
        )}`
      );
      if (incomes.data) {
        setIncomesPeriodData(incomes.data);
      }
    };

    if (!expensesPeriodData) {
      fetchExpensesData();
    }

    if (!incomesPeriodData) {
      fetchIncomesData();
    }

    if (incomes.data) {
      setIncomesDataForChart(prepareDataForChart(incomes.data, false));
      setDataForIncomeCategoriesChart(
        prepareDataForCategoryChart(incomes.data, false)
      );
    } else if (incomesPeriodData) {
      setIncomesDataForChart(prepareDataForChart(incomesPeriodData, false));
      setDataForIncomeCategoriesChart(
        prepareDataForCategoryChart(incomesPeriodData, false)
      );
    }

    if (expenses.data) {
      setExpensesDataForChart(prepareDataForChart(expenses.data, true));
      setDataForExpensesCategoriesChart(
        prepareDataForCategoryChart(expenses.data, true)
      );
    } else if (expensesPeriodData) {
      setExpensesDataForChart(prepareDataForChart(expensesPeriodData, true));
      setDataForExpensesCategoriesChart(
        prepareDataForCategoryChart(expensesPeriodData, true)
      );
    }
  }, [incomes.data, expenses.data]);

  return (
    <>
      {expenses.isError || incomes.isError ? (
        <div>Something went wrong...</div>
      ) : (
        <TabsBar
          tabs={[
            {
              tabName: "Year",
              tabIcon: DeveloperBoardIcon,
              tabContent: (
                <GroupedBarChart
                  incomesDataForChart={incomesDataForChart}
                  expensesDataForChart={expensesDataForChart}
                />
              )
            },
            {
              tabName: "Expenses",
              tabIcon: MoneyOffIcon,
              tabContent: (
                <ExpensesByCategories
                  allData={dataForExpensesCategoriesChart}
                />
              )
            },
            {
              tabName: "Income",
              tabIcon: AttachMoneyIcon,
              tabContent: (
                <CategoriesBarChart
                  dataForChart={dataForIncomeCategoriesChart}
                />
              )
            }
          ]}
        />
      )}
      <SimpleBackdrop
        open={incomes.isLoading || expenses.isLoading ? true : false}
      />
    </>
  );
};

export default ChartsPage;
