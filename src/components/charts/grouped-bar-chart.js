import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  StyledBarChart,
  StyledChartContainer
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
        backgroundColor: theme.palette.primary.light,
        hoverBackgroundColor: theme.palette.primary.dark,
        data: incomesDataForChart.incomes
      },

      {
        label: "Expenses",
        backgroundColor: theme.palette.secondary.light,
        hoverBackgroundColor: theme.palette.secondary.dark,
        data: expensesDataForChart.expenses
      }
    ]
  };

  return (
    <StyledChartContainer>
      <StyledBarChart data={data} />
    </StyledChartContainer>
  );
};

export default GroupedBarChart;
