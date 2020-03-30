import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import GroupedBarChart from "../components/charts/grouped-bar-chart";
import { getLastDayOfMonth } from "../utils/date.utils";
import SimpleBackdrop from "../components/simple-backdrop";
import useFetchData from "../hooks/useFetchData";

const ChartsPage = () => {
  const [dataForChart, setDataForChart] = useState({
    labels: [],
    incomes: [],
    expenses: []
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
    console.log(JSON.stringify(resultObject, null, 2));
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
      sumPerCategoryAndMonth(dataIncomes);
    }
    if (dataExpenses) {
      prepareDataForChart(dataExpenses, true);
    }
  }, [dataIncomes, dataExpenses]);

  return (
    <>
      <div>Charts page</div>
      <SimpleBackdrop
        open={isLoadingIncomes || isLoadingExpenses ? true : false}
      />
      {isErrorExpenses || isErrorIncomes ? (
        <div>Something went wrong...</div>
      ) : (
        <GroupedBarChart dataForChart={dataForChart} />
      )}
    </>
  );
};

export default ChartsPage;
