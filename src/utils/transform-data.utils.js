import {
  purple,
  pink,
  indigo,
  teal,
  lime,
  amber,
  deepOrange,
  blueGrey,
  cyan,
  red,
  lightBlue
} from "@material-ui/core/colors";
import { format } from "date-fns";

const sumPerCategoryAndMonth = data => {
  const dataByCategories = data.reduce((r, a) => {
    r[a.category] = r[a.category] || [];
    r[a.category].push(a);
    return r;
  }, Object.create(null));

  let resultObject = {};
  for (let [key, value] of Object.entries(dataByCategories)) {
    resultObject = {
      ...resultObject,
      [key]: sumPerMonth(value)
    };
  }
  return resultObject;
};

const colorsForCharts = [
  purple[500],
  pink[500],
  indigo[500],
  teal[500],
  lime[500],
  amber[500],
  deepOrange[500],
  blueGrey[500],
  cyan[500],
  red[500],
  lightBlue[500],
  purple["A100"],
  pink["A100"],
  indigo["A100"],
  teal["A100"],
  lime["A100"],
  amber["A100"],
  deepOrange["A100"],
  blueGrey["A100"],
  cyan["A100"],
  red["A100"],
  lightBlue["A100"]
];

export const prepareDataForCategoryChart = (dbData, isExpenses) => {
  const data = sumPerCategoryAndMonth(dbData.reverse());
  let labels = [];
  let datasets = [];
  let categories = [];
  let i = 0;
  for (let key of Object.keys(data)) {
    datasets.push({
      label: key,
      data: Object.values(data[key]),
      backgroundColor: colorsForCharts[i],
      hoverBackgroundColor: colorsForCharts[1]
    });
    categories.push({
      name: key,
      avSum: calculateAverageExpenses(Object.values(data[key])),
      color: colorsForCharts[i]
    });
    i++;
    labels =
      labels.length < Object.keys(data[key]).length
        ? Object.keys(data[key])
        : labels;
  }
  let result = {};
  result = {
    ...result,
    labels,
    datasets,
    categories
  };
  return result;
};

const calculateAverageExpenses = data => {
  const sum = data.reduce((a, b) => Number(a) + Number(b), 0);
  const avg = sum / data.length || 0;
  return avg.toFixed(2);
};

const sumPerMonth = data => {
  const mapDayToMonth = data.reverse().map(entry => ({
    ...entry,
    month: format(new Date(entry.date), "MMMM")
  }));
  const sumPerMonth = mapDayToMonth.reduce((acc, cur) => {
    acc[cur.month] =
      acc[cur.month] + parseFloat(cur.sum.replace(/,/g, "")) ||
      parseFloat(cur.sum.replace(/,/g, ""));
    return acc;
  }, {});
  let result = {};
  for (let [key, value] of Object.entries(sumPerMonth)) {
    result = { ...result, [key]: parseFloat(value).toFixed(2) };
  }
  return result;
};

export const prepareDataForChart = (dbData, isExpenses) => {
  const data = sumPerMonth(dbData);
  let result = {};
  if (isExpenses) {
    result = {
      ...result,
      labels: Object.keys(data),
      expenses: Object.values(data)
    };
  } else {
    result = {
      ...result,
      labels: Object.keys(data),
      incomes: Object.values(data)
    };
  }
  return result;
};
