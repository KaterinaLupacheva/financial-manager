import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";

const GroupedBarChart = ({ dataForChart }) => {
  // console.log('Dataset ' + JSON.stringify(dataForChart, null, 2))
  const theme = useTheme();
  const data = {
    labels: dataForChart.labels,
    datasets: [
      {
        label: "Incomes",
        backgroundColor: theme.palette.primary.light,
        hoverBackgroundColor: theme.palette.primary.dark,
        data: dataForChart.incomes
      },

      {
        label: "Expenses",
        backgroundColor: theme.palette.secondary.light,
        hoverBackgroundColor: theme.palette.secondary.dark,
        data: dataForChart.expenses
      }
    ]
  };

  return <Bar data={data} />;
};

export default GroupedBarChart;
