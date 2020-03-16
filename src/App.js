import React, {useEffect, useState} from 'react';
import './App.css';

import {config } from './gapiConfig';
import {createDataObject} from './utils/createDataObject';

function App() {
  const[data, setData] = useState(null); 

  const getData = () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: 'January!B2:E',
    }).then(response => {
      const range = response.result.values;
      const data = createDataObject(range);
      console.log('RESPONSE ' + JSON.stringify(data, null, 2));
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
    }).then(() => getData())
    .catch((error) => {
      console.log('ERROR ' + error.message)
    });
};
  

  useEffect(() => {
    window.gapi.load('client:auth2', initClient);
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
