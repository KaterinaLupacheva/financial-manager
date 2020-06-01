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
  lightBlue,
} from "@material-ui/core/colors";
import { format } from "date-fns";
import { getMonthsNames } from "../utils/date.utils";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";

const getMonthYearArray = (startDate, endDate) => {
  const getMonthsInterval = eachMonthOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  let monthYearArray = [];
  getMonthsInterval.forEach((date) => {
    monthYearArray.push(format(new Date(date), "MMMM"));
  });
  return monthYearArray;
};

export const sumPerCategoryAndMonth = (data, startDate, endDate) => {
  const dataByCategories = data.reduce((r, a) => {
    r[a.category] = r[a.category] || [];
    r[a.category].push(a);
    return r;
  }, Object.create(null));

  let resultObject = {};

  for (let [key, value] of Object.entries(dataByCategories)) {
    resultObject = {
      ...resultObject,
      [key]: sumPerMonth(value, startDate, endDate),
    };
  }
  return resultObject;
};

export const sumPerCatogyForCurMonth = (monthData) => {
  const sumPerCategory = monthData.reduce((acc, cur) => {
    acc[cur.category] =
      acc[cur.category] + parseFloat(cur.sum.replace(/,/g, "")) ||
      parseFloat(cur.sum.replace(/,/g, ""));
    return acc;
  }, {});
  return sumPerCategory;
};

export const colorsForCharts = [
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
  lightBlue["A100"],
];

export const prepareDataForCategoryChart = (dbData, startDate, endDate) => {
  const data = sumPerCategoryAndMonth(dbData, startDate, endDate);
  let labels = [];
  let datasets = [];
  let categories = [];
  let i = 0;
  for (let key of Object.keys(data)) {
    datasets.push({
      label: key,
      data: Object.values(data[key]),
      backgroundColor: colorsForCharts[i],
      hoverBackgroundColor: colorsForCharts[1],
    });
    categories.push({
      name: key,
      avSum: calculateAverageExpenses(Object.values(data[key])),
      color: colorsForCharts[i],
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
    categories,
  };
  return result;
};

const calculateAverageExpenses = (data) => {
  const sum = data.reduce((a, b) => Number(a) + Number(b), 0);
  const avg = sum / data.length || 0;
  return avg.toFixed(2);
};

const sumPerMonth = (data, startDate, endDate) => {
  let monthYearArray = null;
  if (startDate && endDate) {
    monthYearArray = getMonthYearArray(startDate, endDate);
  }
  const mapDayToMonth = data.map((entry) => ({
    ...entry,
    month: format(new Date(entry.date), "MMMM"),
  }));
  const sumPerMonth = mapDayToMonth.reduce((acc, cur) => {
    acc[cur.month] =
      acc[cur.month] + parseFloat(cur.sum.replace(/,/g, "")) ||
      parseFloat(cur.sum.replace(/,/g, ""));
    return acc;
  }, {});

  let result = {};
  if (monthYearArray) {
    monthYearArray.forEach((month) => {
      for (let [key, value] of Object.entries(sumPerMonth)) {
        if (month === key) {
          result = { ...result, [key]: parseFloat(value).toFixed(2) };
          return;
        } else {
          result = { ...result, [month]: parseFloat(0).toFixed(2) };
        }
      }
    });
  } else {
    for (let [key, value] of Object.entries(sumPerMonth)) {
      result = { ...result, [key]: parseFloat(value).toFixed(2) };
    }
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
      expenses: Object.values(data),
    };
  } else {
    result = {
      ...result,
      labels: Object.keys(data),
      incomes: Object.values(data),
    };
  }
  return result;
};

export const createHeadCells = () => {
  const months = getMonthsNames()[0];
  let headCells = [
    {
      id: "categories",
      label: "Categories",
    },
  ];
  months.forEach((month) => {
    let tempCell = {
      id: month,
      label: month,
    };
    headCells.push(tempCell);
  });
  headCells.push({
    id: "avg",
    label: "Avg.",
    right: true,
  });
  return headCells;
};

export const createTableRows = (data) => {
  const monthsNames = getMonthsNames()[1];
  const shortMonthsNames = getMonthsNames()[0];
  const rows = [];
  for (let [key, value] of Object.entries(data)) {
    let tempRow = {
      name: key,
      avg: parseFloat(calculateAverageExpenses(Object.values(data[key]))),
    };
    monthsNames.forEach((month, idx) => {
      tempRow = {
        ...tempRow,
        [shortMonthsNames[idx]]: Object.keys(value).includes(month)
          ? parseFloat(value[month])
          : parseFloat("0.00"),
      };
    });
    rows.push(tempRow);
  }
  return rows;
};

export const createTotalRow = (data) => {
  const totalPerMonth = Object.values(data).reduce((acc, cur) => {
    for (let key of Object.keys(cur)) {
      acc[key] = acc[key] + parseFloat(cur[key]) || parseFloat(cur[key]);
    }
    return acc;
  }, {});

  const monthsNames = getMonthsNames()[1];
  const shortMonthsNames = getMonthsNames()[0];

  let transformed = {};
  monthsNames.forEach((month, idx) => {
    transformed = {
      ...transformed,
      [shortMonthsNames[idx]]: parseFloat(totalPerMonth[month]),
    };
  });

  return {
    ...transformed,
    name: "Total",
    avg: parseFloat(calculateAverageExpenses(Object.values(totalPerMonth))),
  };
};

export const generateId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  for (let i = 0; i < 15; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return autoId;
};
