import React, { useEffect, useContext, useState } from "react";
import PivotTable from "../components/pivot-table";
import ExpensesContext from "../contexts/expenses.context";
import useFetchData from "../hooks/useFetchData";
import { getLastDayOfMonth } from "../utils/date.utils";
import {
  sumPerCategoryAndMonth,
  createTableRows
} from "../utils/transform-data.utils";

const PivotTablePage = () => {
  const { expensesPeriodData, setExpensesPeriodData } = useContext(
    ExpensesContext
  );
  const [rows, setRows] = useState([]);
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

    const createRowsData = () => {
      let sums = {};
      if (expenses.data) {
        sums = sumPerCategoryAndMonth(expenses.data);
      } else if (expensesPeriodData) {
        sums = sumPerCategoryAndMonth(expensesPeriodData);
      }
      const rows = createTableRows(sums);
      setRows(rows);
    };

    if (!expensesPeriodData) {
      fetchData();
      createRowsData();
    }
  }, [expenses.data]);

  return (
    <>
      <div>Pivot table page</div>
      <PivotTable rows={rows} />
    </>
  );
};

export default PivotTablePage;
