import React, { useEffect, useState, useContext } from "react";

import DatePickerCard from "../components/date-picker-card";
import FloatingAddButton from "../components/floating-add-button";
import ExpansionTable from "../components/expansion-table";
import { Typography } from "@material-ui/core";
import { createDataForTable } from "../utils/formatData";
import { MonthDataContext } from "../contexts/monthData.context";
import SimpleBackdrop from "../components/simple-backdrop";
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

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MonthPage = () => {
  const theme = useTheme();

  const [
    fetchedMonthData,
    doFetchMonthData,
    setFetchedMonthData,
  ] = useFetchData("");
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(new Date());
  const { monthData, setMonthData } = useContext(MonthDataContext);

  const changeDate = (newMonth) => {
    setFetchedMonthData(null);
    setMonthData(null);
    setExpensesData(null);
    setIncomeData(null);
    setMonth(newMonth);
  };

  const fetchData = () => {
    const monthYear = format(new Date(month), "MMM-yyyy");
    doFetchMonthData(`${BASE_URL}/month/${monthYear}`);
    if (monthData) {
      if (monthData.expenses) {
        setExpensesData(createDataForTable(monthData.expenses));
      }
      if (monthData.incomes) {
        setIncomeData(createDataForTable(monthData.incomes));
      }
    } else if (fetchedMonthData.data) {
      setMonthData(fetchedMonthData.data);
      if (fetchedMonthData.data.expenses) {
        setExpensesData(createDataForTable(fetchedMonthData.data.expenses));
      }
      if (fetchedMonthData.data.incomes) {
        setIncomeData(createDataForTable(fetchedMonthData.data.incomes));
      }
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
        <DatePickerCard changeDate={changeDate} title={`Choose month`} date={new Date()}/>
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
            <StyledCardContent style={{ paddingBottom: 0 }}>
              <ExposureRoundedIcon fontSize="large" />
              <CardInside>
                <Typography variant="subtitle1">{`Net month result`}</Typography>
                <Typography variant="h4">{`${calculateResult()}`}</Typography>
              </CardInside>
            </StyledCardContent>
          </StyledCard>
        )}
      </TopBarContainer>
      {expensesData && !fetchedMonthData.isLoading && (
        <ExpansionTable isExpenses={true} tableData={expensesData} />
      )}
      {incomeData && !fetchedMonthData.isLoading && (
        <ExpansionTable isExpenses={false} tableData={incomeData} />
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
      <SimpleBackdrop open={fetchedMonthData.isLoading ? true : false} />
    </div>
  );
};

export default MonthPage;
