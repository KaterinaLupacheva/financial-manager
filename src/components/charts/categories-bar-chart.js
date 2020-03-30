import React from "react";
import { Bar } from "react-chartjs-2";

const CategoriesBarChart = ({ dataForChart }) => {
  const data = {
    labels: dataForChart.labels,
    datasets: dataForChart.datasets
  };

  return <Bar data={data} />;
};

export default CategoriesBarChart;
