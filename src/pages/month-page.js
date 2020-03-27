import React, { useEffect, useState } from "react";

import CustomDatePicker from "../components/date-picker";
import FloatingAddButton from "../components/floating-add-button";
import ExpansionTable from "../components/expansion-table";
import { Box, Typography } from "@material-ui/core";
import { getFirstDayOfMonth, getLastDayOfMonth } from "../utils/date.utils";
import axios from "axios";
import { createDataForTable } from "../utils/formatData";
import MonthExpensesContext from "../contexts/monthExpenses.context";
import MonthIncomeContext from "../contexts/monthIncome.context";
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
      .get(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/expenses/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("FBIdToken")}`
          }
        }
      )
      .then(res => {
        if (res.data.length > 0) {
          setExpensesData(createDataForTable(res.data));
        } else {
          setExpensesData(null);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const fetchIncome = () => {
    setIsLoading(true);
    const startDate = getFirstDayOfMonth(month);
    const endDate = getLastDayOfMonth(month);
    axios
      .get(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/incomes/${startDate}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("FBIdToken")}`
          }
        }
      )
      .then(res => {
        if (res.data.length > 0) {
          setIncomeData(createDataForTable(res.data));
        } else {
          setIncomeData(null);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncome();
  }, [month]);

  const calculateResult = () => {
    let result = 0;
    if (incomeData && expensesData) {
      result = (
        incomeData.totalMonthSum.toFixed(2) -
        expensesData.totalMonthSum.toFixed(2)
      ).toFixed(2);
    } else if (incomeData) {
      result = incomeData.totalMonthSum.toFixed(2);
    } else if (expensesData) {
      result = -expensesData.totalMonthSum.toFixed(2);
    }
    return result;
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="baseline"
        marginBottom="40px"
        marginLeft="40px"
      >
        <CustomDatePicker changeDate={changeDate} />
        <Typography
          variant="h5"
          style={{ marginLeft: 50 }}
        >{`Net month result`}</Typography>
        <Typography variant="h5" style={{ marginLeft: 20, color: "#3e3e3B" }}>
          {`${calculateResult()}`}
        </Typography>
      </Box>
      <MonthExpensesContext.Provider
        value={{
          expensesData,
          fetchExpenses
        }}
      >
        <MonthIncomeContext.Provider
          value={{
            incomeData,
            fetchIncome
          }}
        >
          {expensesData ? (
            <ExpansionTable isExpenses={true} />
          ) : (
            <Typography color="error" gutterBottom={true} variant="h4">
              {"No expenses data"}
            </Typography>
          )}
          {incomeData ? (
            <ExpansionTable isExpenses={false} />
          ) : (
            <Typography color="error" variant="h4">
              {"No income data"}
            </Typography>
          )}
          <FloatingAddButton />
        </MonthIncomeContext.Provider>
      </MonthExpensesContext.Provider>
      <SimpleBackdrop open={isLoading} />
    </div>
  );
};

export default MonthPage;
