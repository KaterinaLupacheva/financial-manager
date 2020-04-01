import { format } from "date-fns";

export const getFirstDayOfMonth = date => {
  return format(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy-MM-dd");
};

export const getLastDayOfMonth = date => {
  return format(
    new Date(date.getFullYear(), date.getMonth() + 1, 1),
    "yyyy-MM-dd"
  );
};

export const formatFromDDMMYYYY = date => {
  const dateParts = date.split(".");
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0], 8);
};
