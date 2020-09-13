import React, { useEffect, useContext, useState } from "react";
import PivotTable from "../components/pivot-table";
import DatePickerCard from "../components/date-picker-card";
import SimpleBackdrop from "../components/simple-backdrop";
import ExpensesContext from "../contexts/expenses.context";
import useFetchData from "../hooks/useFetchData";
import {
  getLastDayOfMonth,
  getFirstDayOfMonthMinusSixMonths,
} from "../utils/date.utils";
import {
  sumPerCategoryAndMonth,
  createTableRows,
  createTotalRow,
} from "../utils/transform-data.utils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PivotTablePage = () => {
  const [dates, setDates] = useState({
    startDate: getFirstDayOfMonthMinusSixMonths(new Date()),
    endDate: getLastDayOfMonth(new Date()),
  });
  const { expensesPeriodData, setExpensesPeriodData } = useContext(
    ExpensesContext
  );
  const [rows, setRows] = useState([]);
  const [totalRow, setTotalRow] = useState({});
  const [periodData, doFetch] = useFetchData("");

  const changeDate = (e) => {
    console.log(dates);
    console.log(e);
  };

  useEffect(() => {
    const fetchData = () => {
      doFetch(`${BASE_URL}/data/${dates.startDate}/${dates.endDate}`);
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
      const rows = createTableRows(sums, dates.startDate, dates.endDate);
      setRows(rows);
      const totalRow = createTotalRow(sums, dates.startDate, dates.endDate);
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
          <DatePickerCard changeDate={changeDate} />
          <PivotTable
            rows={rows}
            totalRow={totalRow}
            startDate={dates.startDate}
            endDate={dates.endDate}
          />
        </>
      )}
      <SimpleBackdrop open={periodData.isLoading ? true : false} />
    </>
  );
};

export default PivotTablePage;
