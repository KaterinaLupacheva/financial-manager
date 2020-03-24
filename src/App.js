import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Sidebar from "./components/sidebar";
import SignupPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import MonthPage from "./pages/month-page";
import PivotTablePage from "./pages/pivot-table-page";
import ChartsPage from "./pages/charts-page";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e1bee7",
      errorText: "#ff1744",
      greenBg: "#00bfa5"
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
              <Route path="/signup" component={SignupPage} />
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
