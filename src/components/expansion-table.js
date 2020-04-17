import React from "react";
import DataTable from "./data-table";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { expansionTableStyles } from "../styles/expansionTable.styles";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(expansionTableStyles);

const ExpansionTable = ({ isExpenses, tableData }) => {
  const name = isExpenses ? "Expenses" : "Income";

  const classes = useStyles();

  const ExpansionPanelDetails = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      [theme.breakpoints.down("md")]: {
        padding: 0
      }
    }
  }))(MuiExpansionPanelDetails);

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
        >{`${name} ${tableData.totalMonthSum.toFixed(2)}`}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <DataTable isExpenses={isExpenses} tableData={tableData} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ExpansionTable;
