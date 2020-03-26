import { format } from "date-fns";

export const createDataForTable = dbData => {
  const sumPerDay = countDaySum(dbData);
  const totalMonthSum = Object.values(sumPerDay).reduce((a, b) => a + b);
  const combinedArrays = combineArrays(sumPerDay, dbData);
  return { combinedArrays, totalMonthSum };
};

const countDaySum = monthData => {
  const sumPerDay = monthData.reduce((acc, cur) => {
    const curDate = format(new Date(cur.date), "dd.MM.yyyy");
    acc[curDate] =
      acc[curDate] + parseFloat(cur.sum.replace(/,/g, "")) ||
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
      date: key,
      sum: value.toFixed(2),
      details: "",
      category: ""
    });
    parentId = id;
    id++;

    monthData.forEach(dayObj => {
      const dateFromDB = format(new Date(dayObj.date), "dd.MM.yyyy");
      if (key === dateFromDB) {
        result.push({
          id: id,
          ...dayObj,
          date: "",
          parentId: parentId
        });
        id++;
      }
    });
  }
  return result;
};
