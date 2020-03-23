import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Sidebar from "./components/sidebar";
import LoginPage from "./pages/login-page";
import MonthPage from "./pages/month-page";
import PivotTablePage from "./pages/pivot-table-page";
import ChartsPage from "./pages/charts-page";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e1bee7"
    },
    secondary: {
      main: "#3e3e3B",
      text: "#EBECED",
      darkBg: "#f06292"
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Sidebar>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/month" component={MonthPage} />
              <Route path="/table" component={PivotTablePage} />
              <Route path="/charts" component={ChartsPage} />
            </Switch>
          </Sidebar>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
