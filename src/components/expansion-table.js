import React, { useContext, useState } from "react";
import DataTable from "./data-table";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { expansionTableStyles } from "../styles/expansionTable.styles";
import MonthExpensesContext from "../contexts/monthExpenses.context";

const useStyles = makeStyles(expansionTableStyles);

const ExpansionTable = ({ isExpenses }) => {
  const { expensesData } = useContext(MonthExpensesContext);
  const name = isExpenses ? "Expenses" : "Income";

  const classes = useStyles();

  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography
          className={`${classes.heading} ${
            isExpenses ? "" : `${classes.green}`
          }`}
        >{`${name} ${
          isExpenses ? expensesData.totalMonthSum.toFixed(2) : ""
        }`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <DataTable isExpenses={isExpenses} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionTable;
