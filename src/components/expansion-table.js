import React from "react";
import DataTable from "./data-table";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 8
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const ExpansionTable = ({ monthData, isExpenses }) => {
  const name = isExpenses ? "Expenses" : "Income";
  const classes = useStyles();
  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography
          className={classes.heading}
        >{`${name} ${monthData.totalMonthSum.toFixed(2)}`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {monthData && <DataTable monthData={monthData} isExpenses={true} />}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionTable;
