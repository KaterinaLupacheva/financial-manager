import React, { useEffect, useState } from "react";
import "./App.css";
import { format } from "date-fns";

import { config } from "./gapiConfig";
import { createDataObject } from "./utils/createDataObject";

import PickerWithButton from "./components/picker-with-button";
import DataTable from "./components/data-table";

function App() {
  const [expensesData, setExpensesData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [month, setMonth] = useState(format(new Date(), "MMMM"));

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
    <div className="App">
      <PickerWithButton changeDate={changeDate} handleSubmit={handleSubmit} />
      {expensesData && <DataTable monthData={expensesData} isExpenses={true} />}
      {incomeData && <DataTable monthData={incomeData} isExpenses={false} />}
    </div>
  );
}

export default App;
