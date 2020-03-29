import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import GroupedBarChart from "../components/charts/grouped-bar-chart";
import { getLastDayOfMonth } from "../utils/date.utils";

const ChartsPage = () => {
  const [expensesData, setExpensesData] = useState(null);
  const [dataForChart, setDataForChart] = useState({
    labels: [],
    incomes: [],
    expenses: []
  });
  const [month, setMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const sumPerMonth = data => {
    const mapDayToMonth = data
      .reverse()
      .map(entry => ({
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
          labels: Object.keys(data),
          incomes: Object.values(data)
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <>
      <div>Charts page</div>
      {dataForChart.labels.length > 0 && (
        <GroupedBarChart dataForChart={dataForChart} />
      )}
    </>
  );
};

export default ChartsPage;
