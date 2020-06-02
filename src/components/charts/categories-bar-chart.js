import React from "react";
import {
  StyledChartContainer,
  StyledHorizontalBarChart,
} from "../../styles/charts.styles";

const CategoriesBarChart = ({ dataForChart }) => {
  const data = {
    labels: dataForChart.labels,
    datasets: dataForChart.datasets,
  };

  return (
    <StyledChartContainer>
      <StyledHorizontalBarChart data={data} />
    </StyledChartContainer>
  );
};

export default CategoriesBarChart;
