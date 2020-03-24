import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import UserContext from "./contexts/user.context";
import axios from "axios";

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
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const setUser = token => {
    console.log("TOKEN " + token);
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        setAuthenticated(false);
      } else {
        const FbIdToken = `Bearer ${token}`;
        localStorage.setItem("FBIdToken", FbIdToken);
        axios.defaults.headers.common["Authorization"] = FbIdToken;
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
          <Sidebar>
            <Switch>
              <UserContext.Provider
                value={{
                  authenticated,
                  email,
                  setUser
                }}
              >
                <AuthRoute path="/signup" component={SignupPage} />
                <AuthRoute path="/login" component={LoginPage} />
                <Route path="/month" component={MonthPage} />
                <Route path="/table" component={PivotTablePage} />
                <Route path="/charts" component={ChartsPage} />
              </UserContext.Provider>
            </Switch>
          </Sidebar>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
