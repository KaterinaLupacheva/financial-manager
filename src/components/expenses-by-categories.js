import React from "react";
import CategoriesBarChart from "./charts/categories-bar-chart";

const ExpensesByCategories = ({ dataForChart }) => {
  // console.log('Data ' + JSON.stringify(dataForChart, null, 2))

  return <CategoriesBarChart dataForChart={dataForChart} />;
};

export default ExpensesByCategories;
