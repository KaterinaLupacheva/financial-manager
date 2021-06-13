import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ExposureRoundedIcon from "@material-ui/icons/ExposureRounded";
import {
  StyledCard,
  StyledCardContent,
  CardInside,
} from "../../styles/card.styles";
import {
  StyledBarChart,
  StyledChartContainer,
  YearChartContainer,
} from "../../styles/charts.styles";

const GroupedBarChart = ({ incomesDataForChart, expensesDataForChart }) => {
  const [netResult, setNetResult] = useState(undefined);
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

  useEffect(() => {
    const getNetResult = () => {
      const expenses = expensesDataForChart.expenses.reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      );
      const incomes = incomesDataForChart.incomes.reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
      );
      setNetResult(parseFloat(incomes - expenses).toFixed(2));
    };
    getNetResult();
  }, [netResult, expensesDataForChart, incomesDataForChart]);

  const options = {
    options: {
      maintainAspectRatio: false,
    },
  };

  return (
    <YearChartContainer>
      <StyledCard
        variant="outlined"
        bgcolor={
          netResult >= 0
            ? theme.palette.secondary.lightBg
            : theme.palette.secondary.palePink
        }
      >
        <StyledCardContent style={{ paddingBottom: 0 }}>
          <ExposureRoundedIcon fontSize="large" />
          <CardInside>
            <Typography variant="h4">{`Net year result: ${netResult}`}</Typography>
          </CardInside>
        </StyledCardContent>
      </StyledCard>
      <StyledChartContainer>
        <StyledBarChart data={data} options={options} />
      </StyledChartContainer>
    </YearChartContainer>
  );
};

export default GroupedBarChart;
