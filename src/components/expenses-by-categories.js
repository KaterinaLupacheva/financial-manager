import React from "react";
import CategoriesBarChart from "./charts/categories-bar-chart";
import CustomSwitch from "./customSwitch";

const ExpensesByCategories = ({ dataForChart }) => {
  //   console.log('Data ' + JSON.stringify(dataForChart, null, 2))

  return (
    <>
      <CustomSwitch />
      <CategoriesBarChart dataForChart={dataForChart} />
    </>
  );
};

export default ExpensesByCategories;
