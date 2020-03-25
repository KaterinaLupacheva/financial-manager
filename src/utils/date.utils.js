import { format } from "date-fns";

export const getFirstDayOfMonth = date => {
  return format(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy-MM-dd");
};

export const getLastDayOfMonth = date => {
  return format(
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
    "yyyy-MM-dd"
  );
};
