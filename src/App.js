import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import UserContext from "./contexts/user.context";
import ExpensesContext from "./contexts/expenses.context";
import IncomeContext from "./contexts/income.context";
import axios from "axios";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Sidebar from "./components/sidebar";
import SignupPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import MonthPage from "./pages/month-page";
// import MonthPage from "./pages/month-page-gsheets";
import PivotTablePage from "./pages/pivot-table-page";
import ChartsPage from "./pages/charts-page";
import AuthRoute from "./utils/authroute";
import StartPage from "./pages/start-page";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e1bee7",
      complementary: "#C4E7BE",
      errorText: "#ff1744",
      greenBg: "#00bfa5",
      darkPurpleBg: "#D099D9"
    },
    secondary: {
      main: "#3e3e3B",
      palePink: "#fc6885",
      ligthBlue: "#BED9E7",
      text: "#EBECED",
      darkBg: "#f06292",
      lightBg: "#a7ffeb"
    }
  }
});

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [expensesPeriodData, setExpensesPeriodData] = useState(null);
  const [incomesPeriodData, setIncomesPeriodData] = useState(null);

  const logoutUser = () => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    setAuthenticated(false);
    setEmail("");
    window.location.href = "/";
  };

  const setUser = token => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logoutUser();
        window.location.href = "/login";
      } else {
        localStorage.setItem("FBIdToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthenticated(true);
        setEmail(decodedToken.email);
      }
    }
  };

  useEffect(() => {
    setUser(localStorage.FBIdToken);
  }, [authenticated]);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <UserContext.Provider
            value={{
              authenticated,
              email,
              setUser,
              logoutUser
            }}
          >
            <Sidebar>
              <Switch>
                <Route exact path="/" component={StartPage} />
                <AuthRoute path="/signup" component={SignupPage} />
                <AuthRoute path="/login" component={LoginPage} />
                <Route path="/month" component={MonthPage} />
                <ExpensesContext.Provider
                  value={{ expensesPeriodData, setExpensesPeriodData }}
                >
                  <Route path="/table" component={PivotTablePage} />
                  <IncomeContext.Provider
                    value={{ incomesPeriodData, setIncomesPeriodData }}
                  >
                    <Route path="/charts" component={ChartsPage} />
                  </IncomeContext.Provider>
                </ExpensesContext.Provider>
              </Switch>
            </Sidebar>
          </UserContext.Provider>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
