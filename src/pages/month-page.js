import React, { useEffect, useState, useContext } from "react";

import CustomDatePicker from "../components/date-picker";
import FloatingAddButton from "../components/floating-add-button";
import ExpansionTable from "../components/expansion-table";
import { Typography } from "@material-ui/core";
import { createDataForTable } from "../utils/formatData";
import MonthExpensesContext from "../contexts/monthExpenses.context";
import MonthIncomeContext from "../contexts/monthIncome.context";
import { MonthDataContext } from "../contexts/monthData.context";
import SimpleBackdrop from "../components/simple-backdrop";
import TodayIcon from "@material-ui/icons/Today";
import ExposureRoundedIcon from "@material-ui/icons/ExposureRounded";
import {
  TopBarContainer,
  StyledCard,
  StyledCardContent,
  CardInside,
} from "../styles/card.styles";
import { useTheme } from "@material-ui/core/styles";
import useFetchData from "../hooks/useFetchData";
import { format } from "date-fns";

const MonthPage = () => {
  const theme = useTheme();

  const [fetchedMonthData, doFetchMonthData] = useFetchData("");
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(new Date());
  const { monthData, setMonthData } = useContext(MonthDataContext);

  const changeDate = (newMonth) => {
    setExpensesData(null);
    setIncomeData(null);
    setMonth(newMonth);
  };

  const fetchData = () => {
    const monthYear = format(new Date(month), "MMM-yyyy");
    doFetchMonthData(
      `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/month/${monthYear}`
    );
    if (fetchedMonthData.data) {
      setMonthData(fetchedMonthData.data);
      setExpensesData(createDataForTable(fetchedMonthData.data.expenses));
      setIncomeData(createDataForTable(fetchedMonthData.data.incomes));
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, fetchedMonthData.data, monthData]);

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
      <TopBarContainer>
        <StyledCard variant="outlined" bgcolor={theme.palette.primary.main}>
          <StyledCardContent>
            <TodayIcon fontSize="large" />
            <CardInside>
              <Typography variant="subtitle1">{`Chose month`}</Typography>
              <CustomDatePicker changeDate={changeDate} />
            </CardInside>
          </StyledCardContent>
        </StyledCard>
        {fetchedMonthData.isLoading ? (
          ""
        ) : (
          <StyledCard
            variant="outlined"
            bgcolor={
              calculateResult() >= 0
                ? theme.palette.secondary.lightBg
                : theme.palette.secondary.palePink
            }
          >
            <StyledCardContent>
              <ExposureRoundedIcon fontSize="large" />
              <CardInside>
                <Typography variant="subtitle1">{`Net month result`}</Typography>
                <Typography variant="h4">{`${calculateResult()}`}</Typography>
              </CardInside>
            </StyledCardContent>
          </StyledCard>
        )}
      </TopBarContainer>
      <MonthExpensesContext.Provider
        value={{
          expensesData,
          fetchData,
        }}
      >
        <MonthIncomeContext.Provider
          value={{
            incomeData,
            fetchData,
          }}
        >
          {expensesData && incomeData && !fetchedMonthData.isLoading && (
            <>
              <ExpansionTable isExpenses={true} />
              <ExpansionTable isExpenses={false} />
            </>
          )}
          {!expensesData && !fetchedMonthData.isLoading && (
            <Typography color="error" gutterBottom={true} variant="h4">
              {"No expenses data"}
            </Typography>
          )}
          {!incomeData && !fetchedMonthData.isLoading && (
            <Typography color="error" variant="h4">
              {"No income data"}
            </Typography>
          )}
          <FloatingAddButton />
        </MonthIncomeContext.Provider>
      </MonthExpensesContext.Provider>
      <SimpleBackdrop open={fetchedMonthData.isLoading ? true : false} />
    </div>
  );
};

export default MonthPage;
