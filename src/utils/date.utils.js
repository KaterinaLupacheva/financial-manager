import { format, eachMonthOfInterval } from "date-fns";

export const getFirstDayOfMonth = (date) => {
  return format(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy-MM-dd");
};

export const getLastDayOfMonth = (date) => {
  return format(
    new Date(date.getFullYear(), date.getMonth() + 1, 1),
    "yyyy-MM-dd"
  );
};

export const formatFromDDMMYYYY = (date) => {
  const dateParts = date.split(".");
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], 8);
};

export const getMonthsNames = () => {
  const result = eachMonthOfInterval({
    start: new Date(2020, 0, 1),
    end: new Date(),
  });
  let shortMonthsNames = [];
  let longMonthsNames = [];
  result.forEach((date) => {
    shortMonthsNames.push(format(new Date(date), "MMM, yy"));
    longMonthsNames.push(format(new Date(date), "MMMM"));
  });
  return [shortMonthsNames, longMonthsNames];
};
