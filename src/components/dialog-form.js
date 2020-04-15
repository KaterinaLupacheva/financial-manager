import React, { useState } from "react";
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
import SelectWithAddOption from "../components/select-with-add-option";
import { format } from "date-fns";
import { generateId } from "../utils/transform-data.utils";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(dialogStyles);

const DialogForm = ({ open, handleClose }) => {
  const INITIAL_STATE = {
    view: "expenses",
    date: new Date(),
    sum: "",
    details: "",
    category: "",
  };
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  const props = { bgcolor: state.view };

  const classes = useStyles(props);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleViewChange = (event, newView) => {
    setState({
      ...state,
      view: newView,
    });
  };

  const handleDateChange = (event) => {
    setState({
      ...state,
      date: event,
    });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      saveData();
      clearForm();
    }
  };

  const saveData = () => {
    let requestBody = {
      docId: format(new Date(state.date), "MMM-yyyy"),
      date: new Date(state.date.getFullYear(), state.date.getMonth(), 1, 8),
      id: generateId(),
      sum: state.sum,
      details: state.details,
      category: state.category,
    };
    if (state.view === "expenses") {
      requestBody = {
        ...requestBody,
        expenseDate: state.date,
      };
    } else {
      requestBody = {
        ...requestBody,
        incomeDate: state.date,
      };
    }

    axios
      .post(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/${state.view}`,
        requestBody
      )
      .then(() => {
        handleSubmit();
      })
      .catch((err) => {
        console.error(err);
      });

    const handleSubmit = () => {
      window.location.reload();
    };
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
        maxWidth="xl"
        fullScreen={fullScreen}
      >
        <DialogTitle id="form-dialog-title">
          Add expenses (-) or income (+)
        </DialogTitle>
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
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk={true}
                  label="Date"
                  minDate={new Date("2020-01-01")}
                  maxDate={new Date()}
                  value={state.date}
                  onChange={(e) => handleDateChange(e)}
                  margin="normal"
                />
              </MuiPickersUtilsProvider>
              <TextField
                autoFocus
                margin="normal"
                name="sum"
                label="Sum"
                value={state.sum}
                type="number"
                step="0.01"
                required={true}
                size="small"
                helperText={errors.sum}
                error={errors.sum ? true : false}
                onChange={handleChange}
              />
              <TextField
                name="details"
                label="Exp / Inc"
                type="text"
                value={state.details}
                required={true}
                helperText={errors.details}
                error={errors.details ? true : false}
                onChange={handleChange}
                margin="normal"
              />
              <SelectWithAddOption
                isExpenses={state.view === "expenses" ? true : false}
                updatedValue={(value) =>
                  setState({
                    ...state,
                    category: value,
                  })
                }
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

export default DialogForm;
