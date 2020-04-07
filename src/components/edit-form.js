import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import { dialogStyles } from "../styles/dialog.styles";
import { Box } from "@material-ui/core";
import axios from "axios";
import MonthExpensesContext from "../contexts/monthExpenses.context";
import MonthIncomeContext from "../contexts/monthIncome.context";
import { formatFromDDMMYYYY } from "../utils/date.utils";
import SelectWithAddOption from "../components/select-with-add-option";

const useStyles = makeStyles(dialogStyles);

const EditForm = ({ open, handleClose, rowData }) => {
  const { fetchMonthExpenses } = useContext(MonthExpensesContext);
  const { fetchIncome } = useContext(MonthIncomeContext);
  const INITIAL_STATE = {
    view: rowData.expenseId ? "expenses" : "incomes",
    date: formatFromDDMMYYYY(rowData.date),
    sum: rowData.sum,
    details: rowData.details,
    category: rowData.category
  };
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleViewChange = (event, newView) => {
    setState({
      ...state,
      view: newView
    });
  };

  const handleDateChange = event => {
    setState({
      ...state,
      date: event
    });
  };

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validate = () => {
    let err = {};
    let valid = true;
    if (state.sum.trim() === "") {
      err.sum = "Must not be empty";
      valid = false;
    }
    if (state.details.trim() === "") {
      err.details = "Must not be empty";
      valid = false;
    }
    if (state.category.trim() === "") {
      err.category = "Must not be empty";
      valid = false;
    }
    setErrors(err);
    return valid;
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      saveData(state);
      clearForm();
    }
  };

  const saveData = state => {
    const id = state.view === "expenses" ? rowData.expenseId : rowData.incomeId;
    axios
      .put(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/${state.view}/${id}`,
        state
      )
      .then(res => {
        if (state.view === "expenses") {
          fetchMonthExpenses();
        } else {
          fetchIncome();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const clearForm = () => {
    setState(INITIAL_STATE);
    setErrors({});
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit data</DialogTitle>
        <form noValidate onSubmit={handleFormSubmit}>
          <DialogContent>
            <div className={classes.toggleContainer}>
              <ToggleButtonGroup
                value={state.view}
                exclusive
                onChange={handleViewChange}
                aria-label="chose type"
              >
                <ToggleButton
                  value="expenses"
                  aria-label="expenses"
                  className={classes.toggleButton}
                >
                  <IndeterminateCheckBoxIcon />
                </ToggleButton>
                <ToggleButton
                  value="incomes"
                  aria-label="incomes"
                  className={classes.toggleButton}
                >
                  <AddBoxIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Box
              display="flex"
              alignItems="baseline"
              width="40vw"
              justifyContent="space-between"
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk={true}
                  label="Date"
                  minDate={new Date("2020-01-01")}
                  maxDate={new Date()}
                  value={state.date}
                  onChange={e => handleDateChange(e)}
                />
              </MuiPickersUtilsProvider>
              <TextField
                autoFocus
                margin="normal"
                name="sum"
                label="Sum"
                value={state.sum}
                type="number"
                required={true}
                size="small"
                helperText={errors.sum}
                error={errors.sum ? true : false}
                onChange={handleChange}
                className={classes.sumField}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <TextField
                name="details"
                label="Exp / Inc"
                type="text"
                value={state.details}
                required={true}
                helperText={errors.details}
                error={errors.details ? true : false}
                onChange={handleChange}
                className={classes.detailsField}
              />
              <SelectWithAddOption
                isExpenses={state.view === "expenses" ? true : false}
              />
            </Box>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button
              onClick={clearForm}
              color="secondary"
              variant="contained"
              className={classes.button}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditForm;
