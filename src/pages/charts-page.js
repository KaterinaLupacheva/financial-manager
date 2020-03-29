import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import GroupedBarChart from "../components/charts/grouped-bar-chart";
import { getLastDayOfMonth } from "../utils/date.utils";
import SimpleBackdrop from "../components/simple-backdrop";

const ChartsPage = () => {
  const [dataForChart, setDataForChart] = useState({
    labels: [],
    incomes: [],
    expenses: []
  });
  const [month, setMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

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

    return sumPerMonth;
  };

  const fetchIncome = () => {
    setIsLoading(true);
    const startDate = "2020-01-01";
    const endDate = getLastDayOfMonth(month);
    axios
      .get(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/incomes/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("FBIdToken")}`
          }
        }
      )
      .then(res => {
        const data = sumPerMonth(res.data);
        setDataForChart({
          ...dataForChart,
          labels:
            dataForChart.labels.length < Object.keys(data).length
              ? Object.keys(data)
              : dataForChart.labels,
          incomes: Object.values(data)
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchExpenses = () => {
    setIsLoading(true);
    const startDate = "2020-01-01";
    const endDate = getLastDayOfMonth(month);
    axios
      .get(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/expenses/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("FBIdToken")}`
          }
        }
      )
      .then(res => {
        const data = sumPerMonth(res.data);
        setDataForChart({
          ...dataForChart,
          labels:
            dataForChart.labels.length < Object.keys(data).length
              ? Object.keys(data)
              : dataForChart.labels,
          expenses: Object.values(data)
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncome();
  }, []);

  return (
    <>
      <div>Charts page</div>
      <GroupedBarChart dataForChart={dataForChart} />
      <SimpleBackdrop open={isLoading} />
    </>
  );
};

export default ChartsPage;
