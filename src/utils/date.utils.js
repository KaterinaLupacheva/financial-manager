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

export const formatDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

export const getLastDayOfCurrentMonth = (date) => {
  return format(
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
    "yyyy-MM-dd"
  );
};

export const getFirstDayOfNextMonth = (date) => {
  return format(
    new Date(date.getFullYear(), date.getMonth() + 1, 1),
    "yyyy-MM-dd"
  );
};

export const getFirstDayOfMonthMinusSixMonths = (date) => {
  return format(
    new Date(date.getFullYear(), date.getMonth() - 6, 1),
    "yyyy-MM-dd"
  );
};

export const formatFromDDMMYYYY = (date) => {
  const dateParts = date.split(".");
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], 8);
};

export const getMonthsNames = (startDate, endDate) => {
  const result = eachMonthOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });
  let shortMonthsNames = [];
  let longMonthsNames = [];
  result.forEach((date) => {
    shortMonthsNames.push(format(new Date(date), "MMM, yy"));
    longMonthsNames.push(format(new Date(date), "MMMM"));
  });
  return [shortMonthsNames, longMonthsNames];
};
