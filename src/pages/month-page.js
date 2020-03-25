import React, { useEffect, useState } from "react";
import CustomDatePicker from "../components/date-picker";
import FloatingAddButton from "../components/floating-add-button";
import ExpansionTable from "../components/expansion-table";
import Box from "@material-ui/core/Box";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date.utils";
import axios from "axios";
import { createDataForTable } from "../utils/formatData";

const MonthPage = () => {
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(new Date());

  const changeDate = newMonth => {
    setMonth(newMonth);
  };

  const handleSubmit = view => {
    if (view === "expenses") {
      fetchExpenses();
    }
  };

  const fetchExpenses = () => {
    const startDate = getFirstDayOfMonth(month);
    const endDate = getLastDayOfMonth(month);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("FBIdToken")}`;
    axios
      .get(`/expenses/${startDate}/${endDate}`)
      .then(res => {
        setExpensesData(createDataForTable(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, [month]);

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        marginBottom="40px"
        marginLeft="40px"
      >
        <CustomDatePicker changeDate={changeDate} />
      </Box>
      {expensesData && (
        <ExpansionTable monthData={expensesData} isExpenses={true} />
      )}
      {incomeData && (
        <ExpansionTable monthData={incomeData} isExpenses={false} />
      )}
      <FloatingAddButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default MonthPage;
