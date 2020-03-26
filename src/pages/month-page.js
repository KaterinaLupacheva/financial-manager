import React, { useEffect, useState } from "react";
import CustomDatePicker from "../components/date-picker";
import FloatingAddButton from "../components/floating-add-button";
import ExpansionTable from "../components/expansion-table";
import Box from "@material-ui/core/Box";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date.utils";
import axios from "axios";
import { createDataForTable } from "../utils/formatData";
import MonthExpensesContext from "../contexts/monthExpenses.context";
import MonthIncomeContext from '../contexts/monthIncome.context';
import SimpleBackdrop from "../components/simple-backdrop";

const MonthPage = () => {
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const changeDate = newMonth => {
    setMonth(newMonth);
  };

  const fetchExpenses = () => {
    setIsLoading(true);
    const startDate = getFirstDayOfMonth(month);
    const endDate = getLastDayOfMonth(month);
    axios
      .get(`/expenses/${startDate}/${endDate}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("FBIdToken")}`}})
      .then(res => {
        setExpensesData(createDataForTable(res.data));
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchIncome = () => {
    
  }

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
      <MonthExpensesContext.Provider
        value={{
          expensesData,
          fetchExpenses
        }}
      >
        {expensesData && <ExpansionTable isExpenses={true} />}
        {incomeData && (
          <ExpansionTable monthData={incomeData} isExpenses={false} />
        )}
        <FloatingAddButton />
      </MonthExpensesContext.Provider>
      <SimpleBackdrop open={isLoading} />
    </div>
  );
};

export default MonthPage;
