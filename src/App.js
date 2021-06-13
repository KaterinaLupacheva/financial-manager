import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UserContext from "./contexts/user.context";
import * as ROUTES from "./constants/routes";

import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import Sidebar from "./components/sidebar";
// import MonthPage from "./pages/month-page-gsheets";
import StartPage from "./pages/start-page";
import { auth } from "./firebase/firebase";
import UnAuthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";
import useViewCounter from "./useViewCounter.hook";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e1bee7",
      complementary: "#C4E7BE",
      errorText: "#ff1744",
      greenBg: "#00bfa5",
      darkPurpleBg: "#9c27b0",
    },
    secondary: {
      main: "#3e3e3B",
      palePink: "#fc6885",
      ligthBlue: "#BED9E7",
      text: "#EBECED",
      darkBg: "#f06292",
      lightBg: "#a7ffeb",
    },
  },
});

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [firstStart, setFirstStart] = useState(true);
  const [email, setEmail] = useState("");
  theme = responsiveFontSizes(theme);

  useViewCounter();

  const logoutUser = () => {
    auth
      .signOut()
      .then(() => {
        setAuthenticated(false);
      })
      .catch((err) => console.error(err));
  };

  const setUser = (user) => {
    if (user) {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      }
    });
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
              logoutUser,
            }}
          >
            <Sidebar>
              <Switch>
                <Route
                  exact
                  path={ROUTES.HOME}
                  component={() => (
                    <StartPage
                      firstStart={firstStart}
                      setFirstStart={() => setFirstStart(false)}
                    />
                  )}
                />
                {authenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
              </Switch>
            </Sidebar>
          </UserContext.Provider>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
