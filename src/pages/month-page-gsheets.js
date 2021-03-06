import React, { useEffect, useState } from "react";
import CustomDatePicker from "../components/date-picker";
import FloatingAddButton from "../components/floating-add-button";
import ExpansionTable from "../components/expansion-table";
import Box from "@material-ui/core/Box";
import { format } from "date-fns";

import { config } from "../gapiConfig";
import { createDataObject } from "../utils/createDataObject";
import { dataToFirestore } from "../utils/dataToFirestore";

const MonthPage = () => {
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(format(new Date("2020-01-10"), "MMMM"));

  const getExpensesData = () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.SPREADSHEET_ID,
        range: `${month}!B2:E`
      })
      .then(
        response => {
          const range = response.result.values;
          const data = createDataObject(range);
          dataToFirestore(data.combinedArrays);
          setExpensesData(data);
        },
        function(response) {
          console.log("ERROR");
        }
      );
  };

  const getIncomeData = () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.SPREADSHEET_ID,
        range: `${month}!R2:U`
      })
      .then(
        response => {
          const range = response.result.values;
          const data = createDataObject(range);
          dataToFirestore(data.combinedArrays);
          setIncomeData(data);
        },
        function(response) {
          console.log("ERROR");
        }
      );
  };

  const initClient = async () => {
    window.gapi.client
      .init({
        apiKey: config.API_KEY,
        clientId: config.CLIENT_ID,
        discoveryDocs: config.DISCOVERY_DOCS,
        scope: config.SCOPES
      })
      .then(() => getExpensesData())
      .then(() => getIncomeData())
      .catch(error => {
        console.log("ERROR " + error.message);
      });
  };

  const changeDate = newMonth => {
    setMonth(newMonth);
  };

  const saveNewExpense = (selectedDate, sum, type, category) => {
    var values = [[selectedDate, sum, type, category]];
    var body = {
      values: values
    };

    window.gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: config.SPREADSHEET_ID,
        range: `${month}!B2:E`,
        valueInputOption: "RAW",
        resource: body
      })
      .then(response => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`);
      });
  };

  const handleSubmit = (view, selectedDate, sum, type, category) => {
    console.log(view, selectedDate, sum, type, category);
    if (view === "expenses") {
      saveNewExpense(selectedDate, sum, type, category);
    }
  };

  useEffect(() => {
    window.gapi.load("client:auth2", initClient);
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
