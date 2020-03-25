import React, { useState, useEffect } from "react";
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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from "@material-ui/core";
import { CATEGORIES } from "../utils/categories";

const useStyles = makeStyles(dialogStyles);

const DialogForm = ({ open, handleClose, handleSubmit }) => {
  const [view, setView] = useState("expenses");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [sum, setSum] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  const validate = () => {
    let err = {};
    let valid = true;
    if (isEmpty(sum)) {
      err.sum = "Must not be empty";
      valid = false;
    }
    if (isEmpty(details)) {
      err.details = "Must not be empty";
      valid = false;
    }
    if (isEmpty(category)) {
      err.category = "Must not be empty";
      valid = false;
    }
    setErrors(err);
    return valid;
  };

  const isEmpty = input => {
    if (input.trim() === "") {
      return true;
    } else {
      return false;
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      const obj = {
        view,
        date: selectedDate,
        sum,
        details,
        category
      };
      handleSubmit(obj);
      clearForm();
    }
  };

  const clearForm = () => {
    setSum("");
    setDetails("");
    setCategory("");
    setErrors({});
    handleClose();
  };

  const handleDialogClose = () => {
    clearForm();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add expenses (-) or income (+)
        </DialogTitle>
        <form noValidate onSubmit={handleFormSubmit}>
          <DialogContent>
            <div className={classes.toggleContainer}>
              <ToggleButtonGroup
                value={view}
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
                  value="income"
                  aria-label="income"
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
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
              <TextField
                autoFocus
                margin="normal"
                name="sum"
                label="Sum"
                value={sum}
                type="number"
                required={true}
                size="small"
                helperText={errors.sum}
                error={errors.sum ? true : false}
                onChange={e => setSum(e.target.value)}
                className={classes.sumField}
              />
            </Box>
            <Box
              display="flex"
              alignItems="baseline"
              width="40vw"
              justifyContent="space-between"
            >
              <TextField
                margin="normal"
                name="details"
                label="Exp / Inc"
                type="text"
                value={details}
                required={true}
                helperText={errors.details}
                error={errors.details ? true : false}
                onChange={e => setDetails(e.target.value)}
                className={classes.detailsField}
              />

              <FormControl required className={classes.formControl}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={category}
                  error={errors.category ? true : false}
                  onChange={e => setCategory(e.target.value)}
                  className={classes.selectEmpty}
                >
                  {view === "expenses"
                    ? CATEGORIES.expenses.map((cat, id) => (
                        <MenuItem value={cat} key={id}>
                          {cat}
                        </MenuItem>
                      ))
                    : CATEGORIES.income.map((cat, id) => (
                        <MenuItem value={cat} key={id}>
                          {cat}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions className={classes.buttons}>
            <Button
              onClick={handleDialogClose}
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

export default DialogForm;
