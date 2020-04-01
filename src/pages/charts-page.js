import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import GroupedBarChart from "../components/charts/grouped-bar-chart";
import CategoriesBarChart from "../components/charts/categories-bar-chart";
import { getLastDayOfMonth } from "../utils/date.utils";
import SimpleBackdrop from "../components/simple-backdrop";
import useFetchData from "../hooks/useFetchData";
import { useTheme } from "@material-ui/core/styles";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TabsBar from "../components/tabs-bar";
import ExpensesByCategories from "../components/expenses-by-categories";
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
  const theme = useTheme();
  const [dataForChart, setDataForChart] = useState({
    labels: [],
    incomes: [],
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
  const [dataIncomes, isLoadingIncomes, isErrorIncomes] = useFetchData(
    `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/incomes/2020-01-01/${getLastDayOfMonth(
      new Date()
    )}`
  );
  const [dataExpenses, isLoadingExpenses, isErrorExpenses] = useFetchData(
    `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/expenses/2020-01-01/${getLastDayOfMonth(
      new Date()
    )}`
  );

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
    const name = isExpenses ? "expenses" : "incomes";
    const data = sumPerMonth(dbData);
    setDataForChart({
      ...dataForChart,
      labels:
        dataForChart.labels.length < Object.keys(data).length
          ? Object.keys(data)
          : dataForChart.labels,
      [name]: Object.values(data)
    });
  };

  useEffect(() => {
    if (dataIncomes) {
      prepareDataForChart(dataIncomes, false);
      prepareDataForCategoryChart(dataIncomes, false);
    }
    if (dataExpenses) {
      prepareDataForChart(dataExpenses, true);
      prepareDataForCategoryChart(dataExpenses, true);
    }
  }, [dataIncomes, dataExpenses]);

  return (
    <>
      {isErrorExpenses || isErrorIncomes ? (
        <div>Something went wrong...</div>
      ) : (
        <TabsBar
          tabs={[
            {
              tabName: "Year",
              tabIcon: DeveloperBoardIcon,
              tabTitle: "Expenses and Income by Month",
              tabContent: <GroupedBarChart dataForChart={dataForChart} />
            },
            {
              tabName: "Expenses",
              tabIcon: MoneyOffIcon,
              tabTitle: "Expenses by Categories",
              tabContent: (
                <ExpensesByCategories
                  dataForChart={dataForExpensesCategoriesChart}
                />
              )
            },
            {
              tabName: "Income",
              tabIcon: AttachMoneyIcon,
              tabTitle: "Income by Categories",
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
        open={isLoadingIncomes || isLoadingExpenses ? true : false}
      />
    </>
  );
};

export default ChartsPage;
