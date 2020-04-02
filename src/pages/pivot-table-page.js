import React, { useEffect, useState, useContext } from "react";
import PivotTable from "../components/pivot-table";
import ExpensesContext from "../contexts/expenses.context";
import useFetchData from "../hooks/useFetchData";
import { getLastDayOfMonth } from "../utils/date.utils";

const PivotTablePage = () => {
  const { expensesPeriodData, setExpensesPeriodData } = useContext(
    ExpensesContext
  );
  const [expenses, doFetch] = useFetchData("");

  useEffect(() => {
    const fetchData = () => {
      doFetch(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/expenses/2020-01-01/${getLastDayOfMonth(
          new Date()
        )}`
      );
      if (expenses.data) {
        setExpensesPeriodData(expenses.data);
      }
    };
    if (!expensesPeriodData) {
      fetchData();
    }
  }, [expenses.data]);

  return (
    <>
      <div>Pivot table page</div>
      <ExpensesContext.Provider value={{ expensesPeriodData }}>
        <PivotTable />
      </ExpensesContext.Provider>
    </>
  );
};

export default PivotTablePage;
