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
import TodayIcon from "@material-ui/icons/Today";
import ExposureRoundedIcon from "@material-ui/icons/ExposureRounded";
import { StyledCard, StyledCardContent } from "../styles/card.styles";
import { useTheme } from "@material-ui/core/styles";

const MonthPage = () => {
  const theme = useTheme();

  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(new Date());
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
  const [isLoadingIncome, setIsLoadingIncome] = useState(false);

  const changeDate = newMonth => {
    setMonth(newMonth);
  };

  const fetchMonthExpenses = () => {
    setIsLoadingExpenses(true);
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
        setIsLoadingExpenses(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoadingExpenses(false);
      });
  };

  const fetchIncome = () => {
    setIsLoadingIncome(true);
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
        setIsLoadingIncome(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoadingIncome(false);
      });
  };

  useEffect(() => {
    fetchMonthExpenses();
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
        alignItems="center"
        marginBottom="40px"
        marginLeft="40px"
      >
        <StyledCard variant="outlined" bgColor={theme.palette.primary.main}>
          <StyledCardContent>
            <TodayIcon fontSize="large" />
            <div style={{ padding: "10px", margin: "0 auto" }}>
              <Typography variant="subtitle1">{`Chose month`}</Typography>
              <CustomDatePicker changeDate={changeDate} />
            </div>
          </StyledCardContent>
        </StyledCard>
        <StyledCard
          variant="outlined"
          bgColor={
            calculateResult() >= 0
              ? theme.palette.secondary.lightBg
              : theme.palette.primary.errorText
          }
        >
          <StyledCardContent>
            <ExposureRoundedIcon fontSize="large" />
            <div style={{ padding: "10px", margin: "0 auto" }}>
              <Typography variant="subtitle1">{`Net month result`}</Typography>
              <Typography variant="h4">{`${calculateResult()}`}</Typography>
            </div>
          </StyledCardContent>
        </StyledCard>
      </Box>
      <MonthExpensesContext.Provider
        value={{
          expensesData,
          fetchMonthExpenses
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
      <SimpleBackdrop
        open={isLoadingExpenses || isLoadingIncome ? true : false}
      />
    </div>
  );
};

export default MonthPage;
