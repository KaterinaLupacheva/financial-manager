import React, { useState, useEffect } from "react";
import CategoriesBarChart from "./charts/categories-bar-chart";
import CustomSwitch from "./customSwitch";

const ExpensesByCategories = ({ dataForChart }) => {
  const [initialState, setInitialState] = useState({});

  const handleSubmit = state => {
    let newData = {};
    console.log(JSON.stringify(state, null, 2));
    for (var key of Object.keys(state)) {
      if (state[key]) {
        //check dataset.label
      }
    }
  };

  useEffect(() => {
    let tempState = {};
    dataForChart.categories.sort(
      (a, b) => parseFloat(b.avSum) - parseFloat(a.avSum)
    );
    dataForChart.categories.map((item, idx) => {
      tempState = {
        ...tempState,
        [item.name]: idx < 5 ? true : false
      };
    });
    setInitialState(tempState);
    //set data for chart only when name === true
  }, []);

  return (
    <>
      {Object.keys(initialState).length > 0 && (
        <CustomSwitch
          initialState={initialState}
          categories={dataForChart.categories}
          handleSubmit={handleSubmit}
        />
      )}
      <CategoriesBarChart dataForChart={dataForChart} />
    </>
  );
};

export default ExpensesByCategories;
