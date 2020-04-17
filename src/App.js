import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import UserContext from "./contexts/user.context";
import ExpensesContext from "./contexts/expenses.context";
import IncomeContext from "./contexts/income.context";
import { ExpensesCategoriesContextProvider } from "./contexts/expensesCategories.context";
import { MonthDataContextProvider } from "./contexts/monthData.context";
import axios from "axios";
import * as ROUTES from "./constants/routes";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Sidebar from "./components/sidebar";
import SignupPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import MonthPage from "./pages/month-page";
// import MonthPage from "./pages/month-page-gsheets";
import PivotTablePage from "./pages/pivot-table-page";
import ChartsPage from "./pages/charts-page";
import AuthRoute from "./utils/authroute";
import VerifiedRoute from "./utils/verifiedRoute";
import StartPage from "./pages/start-page";
import BudgetPage from "./pages/budget-page";
import ForgotPasswordPage from "./pages/forgot-password-page";
import { auth } from "./firebase/firebase";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e1bee7",
      complementary: "#C4E7BE",
      errorText: "#ff1744",
      greenBg: "#00bfa5",
      darkPurpleBg: "#9c27b0"
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

  const setUser = () => {
    if (auth.currentUser) {
      setAuthenticated(true);
    } else {
      window.location.href = "/login";
    }
  };

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
                <Route exact path={ROUTES.HOME} component={StartPage} />

                <AuthRoute path={ROUTES.SIGN_UP} component={SignupPage} />
                <AuthRoute path={ROUTES.LOGIN} component={LoginPage} />
                <Route
                  path={ROUTES.PASSWORD_FORGET}
                  component={ForgotPasswordPage}
                />
                <ExpensesCategoriesContextProvider>
                  <MonthDataContextProvider>
                    <Route path={ROUTES.MONTH} component={MonthPage} />
                    {/* <VerifiedRoute path="/month" component={MonthPage} /> */}
                  </MonthDataContextProvider>
                  <ExpensesContext.Provider
                    value={{ expensesPeriodData, setExpensesPeriodData }}
                  >
                    <Route
                      path={ROUTES.PIVOT_TABLE}
                      component={PivotTablePage}
                    />
                    <IncomeContext.Provider
                      value={{ incomesPeriodData, setIncomesPeriodData }}
                    >
                      <Route path={ROUTES.CHARTS} component={ChartsPage} />
                    </IncomeContext.Provider>
                    <Route path={ROUTES.BUDGET} component={BudgetPage} />
                  </ExpensesContext.Provider>
                </ExpensesCategoriesContextProvider>
              </Switch>
            </Sidebar>
          </UserContext.Provider>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
