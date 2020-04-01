import React, { useState, useEffect } from "react";
import CategoriesBarChart from "./charts/categories-bar-chart";
import CustomSwitch from "./customSwitch";

const ExpensesByCategories = ({ allData }) => {
  const [initialState, setInitialState] = useState({});
  const [dataForChart, setDataForChart] = useState({});

  const handleSubmit = state => {
    let newData = {};
    console.log(JSON.stringify(state, null, 2));
    for (var key of Object.keys(state)) {
      if (state[key]) {
        //check dataset.label
      }
    }
  };

  const findTrueCategories = data => {
    let trueCategories = [];
    for (let [key, value] of Object.entries(data)) {
      if (value) {
        trueCategories.push(key);
      }
    }
    return trueCategories;
  };

  const prepareDatasets = trueCategories => {
    let tempDatasets = [];
    allData.datasets.map(item => {
      if (trueCategories.includes(item.label)) {
        tempDatasets.push(item);
      }
    });
    return tempDatasets;
  };

  useEffect(() => {
    let tempState = {};
    allData.categories.sort(
      (a, b) => parseFloat(b.avSum) - parseFloat(a.avSum)
    );
    allData.categories.map((item, idx) => {
      tempState = {
        ...tempState,
        [item.name]: idx < 5 ? true : false
      };
    });
    setInitialState(tempState);

    const trueCategories = findTrueCategories(tempState);
    const datasetsForChart = prepareDatasets(trueCategories);
    setDataForChart({
      ...dataForChart,
      labels: allData.labels,
      datasets: datasetsForChart
    });
  }, []);

  return (
    <>
      {Object.keys(initialState).length > 0 && (
        <CustomSwitch
          initialState={initialState}
          categories={allData.categories}
          handleSubmit={handleSubmit}
        />
      )}
      {dataForChart && <CategoriesBarChart dataForChart={dataForChart} />}
    </>
  );
};

export default ExpensesByCategories;
