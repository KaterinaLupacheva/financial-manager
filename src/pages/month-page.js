import React, { useEffect, useState } from "react";
import CustomDatePicker from "../components/date-picker";
import FloatingAddButton from "../components/floating-add-button";
import ExpansionTable from "../components/expansion-table";
import Box from "@material-ui/core/Box";
import { format } from "date-fns";
import axios from "axios";
import { createDataObject } from "../utils/createMonthData";

const MonthPage = () => {
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(format(new Date(), "MMMM"));

  const changeDate = newMonth => {
    setMonth(newMonth);
  };

  const handleSubmit = (view, selectedDate, sum, type, category) => {
    console.log(view, selectedDate, sum, type, category);
    // if (view === "expenses") {
    //   saveNewExpense(selectedDate, sum, type, category);
    // }
  };

  useEffect(() => {
    const fetchExpenses = () => {
      axios
        .get("/expenses")
        .then(res => {
          setExpensesData(createDataObject(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    };

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
