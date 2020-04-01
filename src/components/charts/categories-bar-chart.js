import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const CategoriesBarChart = ({ dataForChart }) => {
  const data = {
    labels: dataForChart.labels,
    datasets: dataForChart.datasets
  };

  return <HorizontalBar data={data} />;
};

export default CategoriesBarChart;
