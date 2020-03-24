import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Sidebar from "./components/sidebar";
import SignupPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import MonthPage from "./pages/month-page";
import PivotTablePage from "./pages/pivot-table-page";
import ChartsPage from "./pages/charts-page";
import AuthRoute from "./utils/authroute";

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
  let authenticated;
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      window.location.href = "/login";
      authenticated = false;
    } else {
      authenticated = true;
    }
  }
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Sidebar>
            <Switch>
              <AuthRoute path="/signup" component={SignupPage} authenticated />
              <AuthRoute path="/login" component={LoginPage} authenticated />
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
