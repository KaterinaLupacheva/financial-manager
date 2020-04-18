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
  prepareDataForCategoryChart,
} from "../utils/transform-data.utils";

const ChartsPage = () => {
  const { expensesPeriodData, setExpensesPeriodData } = useContext(
    ExpensesContext
  );
  const { incomesPeriodData, setIncomesPeriodData } = useContext(IncomeContext);
  const [incomesDataForChart, setIncomesDataForChart] = useState({
    labels: [],
    incomes: [],
  });
  const [expensesDataForChart, setExpensesDataForChart] = useState({
    labels: [],
    expenses: [],
  });
  const [
    dataForIncomeCategoriesChart,
    setDataForIncomeCategoriesChart,
  ] = useState({
    labels: [],
    datasets: [],
  });
  const [
    dataForExpensesCategoriesChart,
    setDataForExpensesCategoriesChart,
  ] = useState({
    labels: [],
    datasets: [],
    categories: [],
  });

  const [periodData, doFetchData] = useFetchData("");

  useEffect(() => {
    const fetchData = () => {
      doFetchData(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/data/2020-01-01/${getLastDayOfMonth(
          new Date()
        )}`
      );
      if (periodData.data) {
        if (periodData.data.expenses) {
          setExpensesPeriodData(periodData.data.expenses);
        }
        if (periodData.data.incomes) {
          setIncomesPeriodData(periodData.data.incomes);
        }
      }
    };

    if (!expensesPeriodData || !incomesPeriodData) {
      fetchData();
    }

    if (incomesPeriodData) {
      setIncomesDataForChart(prepareDataForChart(incomesPeriodData, false));
      setDataForIncomeCategoriesChart(
        prepareDataForCategoryChart(incomesPeriodData, "2020-01-01", new Date())
      );
    }

    if (expensesPeriodData) {
      setExpensesDataForChart(prepareDataForChart(expensesPeriodData, true));
      setDataForExpensesCategoriesChart(
        prepareDataForCategoryChart(
          expensesPeriodData,
          "2020-01-01",
          new Date()
        )
      );
    }
  }, [periodData.data, expensesPeriodData, incomesPeriodData]);

  return (
    <>
      {periodData.isError ? (
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
              ),
            },
            {
              tabName: "Expenses",
              tabIcon: MoneyOffIcon,
              tabContent: (
                <ExpensesByCategories
                  allData={dataForExpensesCategoriesChart}
                />
              ),
            },
            {
              tabName: "Income",
              tabIcon: AttachMoneyIcon,
              tabContent: (
                <CategoriesBarChart
                  dataForChart={dataForIncomeCategoriesChart}
                />
              ),
            },
          ]}
        />
      )}
      <SimpleBackdrop open={periodData.isLoading ? true : false} />
    </>
  );
};

export default ChartsPage;
