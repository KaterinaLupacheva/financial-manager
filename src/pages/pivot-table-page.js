import React, { useEffect, useContext, useState } from "react";
import PivotTable from "../components/pivot-table";
import CustomDatePicker from "../components/date-picker";
import SimpleBackdrop from "../components/simple-backdrop";
import ExpensesContext from "../contexts/expenses.context";
import useFetchData from "../hooks/useFetchData";
import { getLastDayOfMonth } from "../utils/date.utils";
import {
  sumPerCategoryAndMonth,
  createTableRows,
  createTotalRow,
} from "../utils/transform-data.utils";

const PivotTablePage = () => {
  const { expensesPeriodData, setExpensesPeriodData } = useContext(
    ExpensesContext
  );
  const [rows, setRows] = useState([]);
  const [totalRow, setTotalRow] = useState({});
  const [periodData, doFetch] = useFetchData("");

  useEffect(() => {
    const fetchData = () => {
      doFetch(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/data/2020-01-01/${getLastDayOfMonth(
          new Date()
        )}`
      );
      if (periodData.data) {
        setExpensesPeriodData(periodData.data.expenses);
      }
    };

    const createRowsData = () => {
      let sums = {};
      if (periodData.data) {
        sums = sumPerCategoryAndMonth(periodData.data.expenses);
      } else if (expensesPeriodData) {
        sums = sumPerCategoryAndMonth(expensesPeriodData);
      }
      const rows = createTableRows(sums);
      setRows(rows);
      const totalRow = createTotalRow(sums);
      setTotalRow(totalRow);
    };

    if (!expensesPeriodData) {
      fetchData();
    }

    createRowsData();
  }, [periodData.data]);

  return (
    <>
      {periodData.isError ? (
        <div>Something went wrong...</div>
      ) : (
        <>
          <CustomDatePicker />
          <PivotTable rows={rows} totalRow={totalRow} />
        </>
      )}
      <SimpleBackdrop open={periodData.isLoading ? true : false} />
    </>
  );
};

export default PivotTablePage;
