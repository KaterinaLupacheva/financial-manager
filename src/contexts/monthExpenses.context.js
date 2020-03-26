import { createContext } from "react";

const MonthExpensesContext = createContext({
  expensesData: null,
  fetchExpenses: () => {}
});

export default MonthExpensesContext;
