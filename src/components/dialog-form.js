import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}));

const DialogForm = ({ open, handleClose, handleSubmit }) => {
  const [view, setView] = useState("expenses");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [sum, handleSumChange] = useState(0);

  const classes = useStyles();

  const handleViewChange = (event, newView) => {
    setView(newView);
  };

  const handleChange = e => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "sum":
        handleSumChange(e.target.value);
        break;
      default:
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add expenses or income</DialogTitle>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk={true}
              label="Date"
              minDate={new Date("2020-01-01")}
              maxDate={new Date()}
              value={selectedDate}
              onChange={e => handleDateChange(format(e, "yyyy-MM-dd"))}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            name="sum"
            label="Sum"
            type="number"
            required={true}
            size="small"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Exp / Inc"
            type="text"
            required={true}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmit();
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
