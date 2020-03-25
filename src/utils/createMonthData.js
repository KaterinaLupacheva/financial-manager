import { format } from "date-fns";

export const createDataForTable = dbData => {
  const sumPerDay = countDaySum(dbData);
  const totalMonthSum = Object.values(sumPerDay).reduce((a, b) => a + b);
  const combinedArrays = combineArrays(sumPerDay, dbData);
  return { combinedArrays, totalMonthSum };
};

const countDaySum = monthData => {
  const sumPerDay = monthData.reduce((acc, cur) => {
    acc[cur.date] =
      acc[cur.date] + parseFloat(cur.sum.replace(/,/g, "")) ||
      parseFloat(cur.sum.replace(/,/g, ""));
    return acc;
  }, {});
  return sumPerDay;
};

const combineArrays = (sumPerDay, monthData) => {
  const result = [];
  let id = 1;
  let parentId = 0;
  for (let [key, value] of Object.entries(sumPerDay)) {
    result.push({
      id: id,
      date: format(new Date(key), "dd.MM.yyyy"),
      sum: value.toFixed(2),
      details: "",
      category: ""
    });
    parentId = id;
    id++;

    monthData.forEach(dayObj => {
      if (key === dayObj.date) {
        result.push({
          id: id,
          ...dayObj,
          date: format(new Date(dayObj.date), "dd.MM.yyyy"),
          parentId: parentId
        });
        id++;
      }
    });
  }
  return result;
};
