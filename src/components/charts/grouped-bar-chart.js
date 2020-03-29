import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";

const GroupedBarChart = ({ dataForChart }) => {
  const data = {
    labels: dataForChart.labels,
    datasets: [
      {
        label: "Incomes",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dataForChart.incomes
      },

      {
        label: "My second dataset",
        backgroundColor: "rgba(155,231,91,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        //stack: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [45, 79, 50, 41, 16, 85, 20]
      }
    ]
  };

  useEffect(() => {
    console.log(JSON.stringify(dataForChart, null, 2));
  }, []);

  return <Bar data={data} />;
};

export default GroupedBarChart;
