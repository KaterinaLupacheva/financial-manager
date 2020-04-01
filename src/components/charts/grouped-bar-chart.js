import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  StyledBarChart,
  StyledChartContainer
} from "../../styles/charts.styles";

const GroupedBarChart = ({ dataForChart }) => {
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

  return (
    <StyledChartContainer>
      <StyledBarChart data={data} />
    </StyledChartContainer>
  );
};

export default GroupedBarChart;
