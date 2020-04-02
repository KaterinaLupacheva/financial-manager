import { createContext } from "react";

const MonthExpensesContext = createContext({
  expensesData: null,
  fetchMonthExpenses: () => {}
});

export default MonthExpensesContext;
