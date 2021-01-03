import React, { useState, useContext, useEffect } from "react";
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
import { formatFromDDMMYYYY } from "../utils/date.utils";
import SelectWithAddOption from "../components/select-with-add-option";
import { MonthDataContext } from "../contexts/monthData.context";
import { format } from "date-fns";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { auth } from "../firebase/firebase";
import useFetchData from "../hooks/useFetchData";

const useStyles = makeStyles(dialogStyles);

const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditForm = ({ open, handleClose, rowData, isExpenses }) => {
  const { monthData, setMonthData } = useContext(MonthDataContext);
  const [fetchedMonthData, doFetchMonthData] = useFetchData("");
  const [state, setState] = useState({});
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
      const newMonthYear = format(new Date(state.date), "MMM-yyyy");
      const currentMonthYear = format(new Date(monthData.date), "MMM-yyyy");
      if (currentMonthYear === newMonthYear) {
        updateData(monthData, currentMonthYear);
      } else {
        //fetch new month data
        doFetchMonthData(`${BASE_URL}/month/${newMonthYear}`);

        //update new array
        //delete row from old month
      }
      // updateData();
      clearForm();
    }
  };

  const updateData = (dataArray, monthYear) => {
    const requestBody = {
      [state.view]: updateArray(dataArray[state.view]),
    };

    console.log(requestBody);

    //  auth.onAuthStateChanged(async (user) => {
    //       if (user) {
    //         user
    //           .getIdToken()
    //           .then((token) => {
    //             axios
    //               .put(`${BASE_URL}/month/${monthYear}`, requestBody, {
    //                 headers: {
    //                   Authorization: `Bearer ${token}`,
    //                 },
    //               })
    //               .then(() => {
    //                 if (state.view === "expenses") {
    //                   setMonthData({
    //                     ...monthData,
    //                     expenses: requestBody.expenses,
    //                   });
    //                 } else {
    //                   setMonthData({
    //                     ...monthData,
    //                     incomes: requestBody.incomes,
    //                   });
    //                 }
    //               });
    //           })
    //           .catch((err) => {
    //             console.error(err);
    //           });
    //       }
    //     });
  };

  const updateArray = (array) => {
    if (array) {
      const idx = array.findIndex((obj) => obj.id === rowData.id);
      array[idx] = {
        ...array[idx],
        date: state.date,
        details: state.details,
        category: state.category,
        sum: state.sum,
      };
      return array;
    }
  };

  const clearForm = () => {
    setErrors({});
    handleClose();
  };

  useEffect(() => {
    setState({
      view: isExpenses ? "expenses" : "incomes",
      date: formatFromDDMMYYYY(rowData.date),
      sum: rowData.sum,
      details: rowData.details,
      category: rowData.category,
    });
  }, [rowData, isExpenses]);

  useEffect(() => {
    if (fetchedMonthData.data) {
      updateData(
        fetchedMonthData.data,
        format(new Date(state.date), "MMM-yyyy")
      );
    }
  }, [fetchedMonthData, state.date]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={true}
        fullScreen={fullScreen}
      >
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Edit data
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
              className={classes.fieldsContainer}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.field}
                  autoOk={true}
                  label="Date"
                  minDate={new Date("2020-01-01")}
                  maxDate={new Date()}
                  value={state.date}
                  onChange={(e) => handleDateChange(e)}
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
              <TextField
                className={classes.field}
                autoFocus
                name="sum"
                label="Sum"
                value={state.sum}
                type="number"
                step="0.01"
                required={true}
                variant="outlined"
                helperText={errors.sum}
                error={errors.sum ? true : false}
                onChange={handleChange}
              />
              <TextField
                className={classes.field}
                name="details"
                label="Exp / Inc"
                type="text"
                value={state.details}
                required={true}
                helperText={errors.details}
                error={errors.details ? true : false}
                onChange={handleChange}
                variant="outlined"
              />
              <SelectWithAddOption
                isExpenses={state.view === "expenses" ? true : false}
                initialValue={state.category}
                updatedValue={(value) =>
                  setState({
                    ...state,
                    category: value,
                  })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
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
