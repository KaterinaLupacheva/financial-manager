import React, { useEffect, useContext, useState } from "react";
import PivotTable from "../components/pivot-table";
import ExpensesContext from "../contexts/expenses.context";
import useFetchData from "../hooks/useFetchData";
import { getLastDayOfMonth } from "../utils/date.utils";
import { sumPerCategoryAndMonth } from "../utils/transform-data.utils";

const PivotTablePage = () => {
  const { expensesPeriodData, setExpensesPeriodData } = useContext(
    ExpensesContext
  );
  const [tableData, setTableData] = useState({});
  const [expenses, doFetch] = useFetchData("");

  // useEffect(() => {
  //   const fetchData = () => {
  //     doFetch(
  //       `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/expenses/2020-01-01/${getLastDayOfMonth(
  //         new Date()
  //       )}`
  //     );
  //     if (expenses.data) {
  //       setExpensesPeriodData(expenses.data);
  //     }
  //   };
  //   if (!expensesPeriodData) {
  //     fetchData();
  //   }

  //   if(expenses.data) {
  //     const sums = sumPerCategoryAndMonth(expenses.data);

  //     setTableData();
  //   } else if(expensesPeriodData) {
  //     setTableData(sumPerCategoryAndMonth(expensesPeriodData, true));
  //   }
  // }, [expenses.data]);

  return (
    <>
      <div>Pivot table page</div>
      <PivotTable data={tableData} />
    </>
  );
};

export default PivotTablePage;
