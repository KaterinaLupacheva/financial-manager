import React, { useState } from "react";
import { Route } from "react-router-dom";
import ExpensesContext from "./contexts/expenses.context";
import IncomeContext from "./contexts/income.context";
import { ExpensesCategoriesContextProvider } from "./contexts/expensesCategories.context";
import { MonthDataContextProvider } from "./contexts/monthData.context";
import MonthPage from "./pages/month-page";
import PivotTablePage from "./pages/pivot-table-page";
import ChartsPage from "./pages/charts-page";
import BudgetPage from "./pages/budget-page";
import * as ROUTES from "./constants/routes";

const AuthenticatedApp = () => {
  const [expensesPeriodData, setExpensesPeriodData] = useState(null);
  const [incomesPeriodData, setIncomesPeriodData] = useState(null);

  return (
    <ExpensesCategoriesContextProvider>
      <MonthDataContextProvider>
        <Route path={ROUTES.MONTH} component={MonthPage} />
      </MonthDataContextProvider>
      <ExpensesContext.Provider
        value={{ expensesPeriodData, setExpensesPeriodData }}
      >
        <Route path={ROUTES.PIVOT_TABLE} component={PivotTablePage} />
        <IncomeContext.Provider
          value={{ incomesPeriodData, setIncomesPeriodData }}
        >
          <Route path={ROUTES.CHARTS} component={ChartsPage} />
        </IncomeContext.Provider>
        <Route path={ROUTES.BUDGET} component={BudgetPage} />
      </ExpensesContext.Provider>
    </ExpensesCategoriesContextProvider>
  );
};

export default AuthenticatedApp;
