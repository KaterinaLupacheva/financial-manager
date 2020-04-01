import React, { useState, useEffect } from "react";
import CategoriesBarChart from "./charts/categories-bar-chart";
import CustomSwitch from "./customSwitch";
import "../styles/expenses-by-categories.styles.css";

const ExpensesByCategories = ({ allData }) => {
  const [initialState, setInitialState] = useState({});
  const [dataForChart, setDataForChart] = useState({});

  const handleSubmit = state => {
    prepareDatasets(state);
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

  const prepareDatasets = data => {
    const trueCategories = findTrueCategories(data);
    let tempDatasets = [];
    allData.datasets.forEach(item => {
      if (trueCategories.includes(item.label)) {
        tempDatasets.push(item);
      }
    });
    setDataForChart({
      ...dataForChart,
      labels: allData.labels,
      datasets: tempDatasets
    });
  };

  const findTop5Categories = () => {
    let tempState = {};
    allData.categories.sort(
      (a, b) => parseFloat(b.avSum) - parseFloat(a.avSum)
    );
    allData.categories.forEach((item, idx) => {
      tempState = {
        ...tempState,
        [item.name]: idx < 5 ? true : false
      };
    });
    return tempState;
  };

  useEffect(() => {
    const tempState = findTop5Categories();
    setInitialState(tempState);
    prepareDatasets(tempState);
  }, []);

  return (
    <div className="expenses-container">
      <div className="categories-chart-container">
        {dataForChart && <CategoriesBarChart dataForChart={dataForChart} />}
      </div>
      {Object.keys(initialState).length > 0 && (
        <CustomSwitch
          initialState={initialState}
          categories={allData.categories}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ExpensesByCategories;
