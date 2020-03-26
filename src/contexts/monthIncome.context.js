import { createContext } from "react";

const MonthIncomeContext = createContext({
  incomeData: null,
  fetchIncome: () => {}
});

export default MonthIncomeContext;
