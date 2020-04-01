import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const CategoriesBarChart = ({ dataForChart }) => {
  // console.log('Data for charts ' + JSON.stringify(dataForChart, null, 2))
  const data = {
    labels: dataForChart.labels,
    datasets: dataForChart.datasets
  };

  return <HorizontalBar data={data} />;
};

export default CategoriesBarChart;
