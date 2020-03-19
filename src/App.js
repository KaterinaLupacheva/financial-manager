import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/sidebar";
import MonthPage from "./pages/month-page";
import PivotTablePage from "./pages/pivot-table-page";
import ChartsPage from "./pages/charts-page";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar>
          <Switch>
            <Route path="/month" component={MonthPage} />
            <Route path="/table" component={PivotTablePage} />
            <Route path="/charts" component={ChartsPage} />
          </Switch>
        </Sidebar>
      </div>
    </Router>
  );
}

export default App;
