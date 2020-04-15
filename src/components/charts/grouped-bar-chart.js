import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  StyledBarChart,
  StyledChartContainer,
} from "../../styles/charts.styles";

const GroupedBarChart = ({ incomesDataForChart, expensesDataForChart }) => {
  const theme = useTheme();
  const data = {
    labels:
      expensesDataForChart.labels.length > incomesDataForChart.labels.length
        ? expensesDataForChart.labels
        : incomesDataForChart.labels,
    datasets: [
      {
        label: "Incomes",
        backgroundColor: theme.palette.secondary.lightBg,
        hoverBackgroundColor: theme.palette.primary.dark,
        data: incomesDataForChart.incomes,
      },

      {
        label: "Expenses",
        backgroundColor: theme.palette.secondary.palePink,
        hoverBackgroundColor: theme.palette.secondary.dark,
        data: expensesDataForChart.expenses,
      },
    ],
  };

  const options = {
    options: {
      maintainAspectRatio: false,
    },
  };

  return (
    <StyledChartContainer>
      <StyledBarChart data={data} options={options} />
    </StyledChartContainer>
  );
};

export default GroupedBarChart;
