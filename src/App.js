import React, {useEffect, useState} from 'react';
import './App.css';
import { format } from 'date-fns';

import {config } from './gapiConfig';
import {createDataObject} from './utils/createDataObject';

import CustomDatePicker from './components/date-picker';
import DataTable from './components/data-table';

function App() {
  const[expensesData, setExpensesData] = useState(null);
  const[incomeData, setIncomeData] = useState(null);
  const[month, setMonth] = useState(format(new Date(), 'MMMM')); 

  const getExpensesData = () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `${month}!B2:E`,
    }).then(response => {
      const range = response.result.values;
      const data = createDataObject(range);
      setExpensesData(data);
    }, function(response) {
      console.log('ERROR')
    });
  };

  const getIncomeData = () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `${month}!R2:U`,
    }).then(response => {
      const range = response.result.values;
      const data = createDataObject(range);
      setIncomeData(data);
    }, function(response) {
      console.log('ERROR')
    });
  };
  

  const initClient = async () => {
    window.gapi.client.init({
      apiKey: config.API_KEY,
      clientId: config.CLIENT_ID,
      discoveryDocs: config.DISCOVERY_DOCS,
      scope: config.SCOPES
    }).then(() => getExpensesData())
    .then(() => getIncomeData())
    .catch((error) => {
      console.log('ERROR ' + error.message)
    });
};

const changeDate = newMonth => {
  setMonth(newMonth);
}
  
  useEffect(() => {
    window.gapi.load('client:auth2', initClient);
  }, [month]);

  return (
    <div className="App">
      <CustomDatePicker changeDate={changeDate}/>
      {expensesData && <DataTable monthData={expensesData} isExpenses={true}/>}
      {incomeData && <DataTable monthData={incomeData} isExpenses={false}/>}
    </div>
  );
}

export default App;
