import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
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
  purple,
  pink,
  indigo,
  teal,
  lime,
  amber,
  deepOrange,
  blueGrey,
  cyan,
  red,
  lightBlue
} from "@material-ui/core/colors";

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

  const sumPerCategoryAndMonth = data => {
    const dataByCategories = data.reduce((r, a) => {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));

    let resultObject = {};
    for (let [key, value] of Object.entries(dataByCategories)) {
      resultObject = {
        ...resultObject,
        [key]: sumPerMonth(value)
      };
    }
    return resultObject;
  };

  const colorsForCharts = [
    purple[500],
    pink[500],
    indigo[500],
    teal[500],
    lime[500],
    amber[500],
    deepOrange[500],
    blueGrey[500],
    cyan[500],
    red[500],
    lightBlue[500],
    purple["A100"],
    pink["A100"],
    indigo["A100"],
    teal["A100"],
    lime["A100"],
    amber["A100"],
    deepOrange["A100"],
    blueGrey["A100"],
    cyan["A100"],
    red["A100"],
    lightBlue["A100"]
  ];

  const prepareDataForCategoryChart = (dbData, isExpenses) => {
    const data = sumPerCategoryAndMonth(dbData.reverse());
    let labels = [];
    let dataset = [];
    let categories = [];
    let i = 0;
    for (let key of Object.keys(data)) {
      dataset.push({
        label: key,
        data: Object.values(data[key]),
        backgroundColor: colorsForCharts[i],
        hoverBackgroundColor: colorsForCharts[1]
      });
      categories.push({
        name: key,
        avSum: calculateAverageExpenses(Object.values(data[key])),
        color: colorsForCharts[i]
      });
      i++;
      labels =
        labels.length < Object.keys(data[key]).length
          ? Object.keys(data[key])
          : labels;
    }
    if (isExpenses) {
      setDataForExpensesCategoriesChart({
        ...dataForExpensesCategoriesChart,
        labels: labels,
        datasets: dataset,
        categories: categories
      });
    } else {
      setDataForIncomeCategoriesChart({
        ...dataForIncomeCategoriesChart,
        labels: labels,
        datasets: dataset
      });
    }
  };

  const calculateAverageExpenses = data => {
    const sum = data.reduce((a, b) => Number(a) + Number(b), 0);
    const avg = sum / data.length || 0;
    return avg.toFixed(2);
  };

  const sumPerMonth = data => {
    const mapDayToMonth = data.reverse().map(entry => ({
      ...entry,
      month: format(new Date(entry.date), "MMMM")
    }));
    const sumPerMonth = mapDayToMonth.reduce((acc, cur) => {
      acc[cur.month] =
        acc[cur.month] + parseFloat(cur.sum.replace(/,/g, "")) ||
        parseFloat(cur.sum.replace(/,/g, ""));
      return acc;
    }, {});
    let result = {};
    for (let [key, value] of Object.entries(sumPerMonth)) {
      result = { ...result, [key]: parseFloat(value).toFixed(2) };
    }
    return result;
  };

  const prepareDataForChart = (dbData, isExpenses) => {
    const data = sumPerMonth(dbData);
    if (isExpenses) {
      setExpensesDataForChart({
        ...expensesDataForChart,
        labels: Object.keys(data),
        expenses: Object.values(data)
      });
    } else {
      setIncomesDataForChart({
        ...incomesDataForChart,
        labels: Object.keys(data),
        incomes: Object.values(data)
      });
    }
  };

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
      prepareDataForChart(incomes.data, false);
      prepareDataForCategoryChart(incomes.data, false);
    } else if (incomesPeriodData) {
      prepareDataForChart(incomesPeriodData, false);
      prepareDataForCategoryChart(incomesPeriodData, false);
    }

    if (expenses.data) {
      prepareDataForChart(expenses.data, true);
      prepareDataForCategoryChart(expenses.data, true);
    } else if (expensesPeriodData) {
      prepareDataForChart(expensesPeriodData, true);
      prepareDataForCategoryChart(expensesPeriodData, true);
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
