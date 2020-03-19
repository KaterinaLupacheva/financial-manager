import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from "@material-ui/core";
import { CATEGORIES } from "../utils/categories";

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  },
  formControl: {
    minWidth: 195
  }
}));

const TextFieldLeftMargin = styled(TextField)({
  marginLeft: 20
});

const TextFieldRightMargin = styled(TextField)({
  marginRight: 20
});

const DialogForm = ({ open, handleClose, handleSubmit }) => {
  const [view, setView] = useState("expenses");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [sum, handleSumChange] = useState(0);
  const [type, handleTypeChange] = useState("");
  const [category, handleCategoryChange] = useState("");

  const classes = useStyles();

  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  const handleChange = e => {
    switch (e.target.name) {
      case "sum":
        handleSumChange(e.target.value);
        break;
      case "type":
        handleTypeChange(e.target.value);
        break;
      case "category":
        handleCategoryChange(e.target.value);
        break;
    }
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
        <DialogContent>
          <div className={classes.toggleContainer}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="chose type"
            >
              <ToggleButton value="expenses" aria-label="expenses">
                <IndeterminateCheckBoxIcon />
              </ToggleButton>
              <ToggleButton value="income" aria-label="income">
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
            <TextFieldLeftMargin
              autoFocus
              margin="normal"
              name="sum"
              label="Sum"
              type="number"
              required={true}
              size="small"
              onChange={handleChange}
            />
          </Box>
          <Box
            display="flex"
            alignItems="baseline"
            width="40vw"
            justifyContent="space-between"
          >
            <TextFieldRightMargin
              margin="normal"
              name="type"
              label="Exp / Inc"
              type="text"
              required={true}
              onChange={handleChange}
            />

            <FormControl required className={classes.formControl}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={category}
                onChange={handleChange}
                className={classes.selectEmpty}
              >
                {view === "expenses"
                  ? CATEGORIES.expenses.map(cat => (
                      <MenuItem value={cat}>{cat}</MenuItem>
                    ))
                  : CATEGORIES.income.map(cat => (
                      <MenuItem value={cat}>{cat}</MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmit(view, selectedDate, sum, type, category);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogForm;
