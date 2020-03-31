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
    datasets: []
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
    theme.palette.primary.light,
    theme.palette.primary.dark,
    theme.palette.secondary.light,
    theme.palette.secondary.dark,
    theme.palette.primary.main,
    theme.palette.primary.complementary,
    theme.palette.primary.greenBg
  ];

  const prepareDataForCategoryChart = (dbData, isExpenses) => {
    const data = sumPerCategoryAndMonth(dbData.reverse());
    let labels = [];
    let dataset = [];
    let i = 0;
    for (let key of Object.keys(data)) {
      dataset.push({
        label: key,
        data: Object.values(data[key]),
        backgroundColor: colorsForCharts[i],
        hoverBackgroundColor: colorsForCharts[1]
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
        datasets: dataset
      });
    } else {
      setDataForIncomeCategoriesChart({
        ...dataForIncomeCategoriesChart,
        labels: labels,
        datasets: dataset
      });
    }
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
              tabContent: <GroupedBarChart dataForChart={dataForChart} />
            },
            {
              tabName: "Expenses",
              tabIcon: MoneyOffIcon,
              tabContent: (
                <CategoriesBarChart
                  dataForChart={dataForExpensesCategoriesChart}
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
        open={isLoadingIncomes || isLoadingExpenses ? true : false}
      />
    </>
  );
};

export default ChartsPage;
