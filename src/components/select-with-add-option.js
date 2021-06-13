import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import axios from "axios";
import SnackBar from "./snackbar";
import { ExpensesCategoriesContext } from "../contexts/expensesCategories.context";
import useFetchData from "../hooks/useFetchData";
import { makeStyles } from "@material-ui/core/styles";
import { dialogStyles } from "../styles/dialog.styles";

const filter = createFilterOptions();
const useStyles = makeStyles(dialogStyles);

const SelectWithAddOption = ({ isExpenses, initialValue, updatedValue }) => {
  const classes = useStyles();
  const [open, toggleOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [fetchedCategories, doFetchCategories] = useFetchData("");
  const [expensesOptions, setExpensesOptions] = useState([]);
  const [incomesOptions, setIncomesOptions] = useState([]);
  const { expensesCategories, setExpensesCategories } = useContext(
    ExpensesCategoriesContext
  );
  const [snackbarIsOpened, openSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setDialogValue({
      category: "",
      type: "",
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    category: "",
    type: "",
  });

  const validate = () => {
    let err = {};
    let valid = true;
    if (dialogValue.category.trim() === "") {
      err.category = "Must not be empty";
      valid = false;
    }
    if (dialogValue.type.trim() === "") {
      err.type = "Must not be empty";
      valid = false;
    }
    setErrors(err);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      updatedValue(dialogValue.category);
      saveData();
      handleClose();
    }
  };

  const saveData = () => {
    let tempObject = {};
    let reqBody = {};
    if (dialogValue.type === "expenses") {
      tempObject = {
        ...expensesCategories,
        [dialogValue.category]: "",
      };
      reqBody = {
        expensesCategories: tempObject,
      };
    } else {
      tempObject = {
        ...fetchedCategories.data.incomesCategories,
        [dialogValue.category]: "",
      };
      reqBody = {
        incomesCategories: tempObject,
      };
    }
    axios
      .post(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/user`,
        reqBody
      )
      .then((res) => {
        setMessage(`Category ${dialogValue.category} added`);
        openSnackbar(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const fetchCategories = () => {
      doFetchCategories(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/user`
      );
      if (fetchedCategories.data) {
        setExpensesCategories(fetchedCategories.data.expensesCategories);
      }
    };

    const getExpensesOptions = () => {
      let result = [];
      for (let key of Object.keys(fetchedCategories.data.expensesCategories)) {
        result.push({
          category: key,
          type: "expenses",
        });
      }
      setExpensesOptions(result);
    };

    const getIncomesOptions = () => {
      let result = [];
      for (let key of Object.keys(fetchedCategories.data.incomesCategories)) {
        result.push({
          category: key,
          type: "incomes",
        });
      }
      setIncomesOptions(result);
    };
    fetchCategories();
    if (fetchedCategories.data) {
      getExpensesOptions();
      getIncomesOptions();
    }
  }, [fetchedCategories.data, doFetchCategories, setExpensesCategories]);

  return (
    <>
      <Autocomplete
        value={initialValue}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                category: newValue.charAt(0).toUpperCase() + newValue.slice(1),
                type: "",
              });
            });
            return;
          }

          if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              category:
                newValue.inputValue.charAt(0).toUpperCase() +
                newValue.inputValue.slice(1),
              type: "",
            });

            return;
          }

          if (newValue) {
            updatedValue(newValue.category);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              category: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo"
        options={isExpenses ? expensesOptions : incomesOptions}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.category;
        }}
        renderOption={(option) => option.category}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            variant="outlined"
            className={classes.field}
          />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Did you miss any category in our list? Please, add it!
          </DialogContentText>
          <Box
            display="flex"
            alignItems="baseline"
            justifyContent="space-between"
          >
            <TextField
              autoFocus
              required={true}
              id="name"
              value={dialogValue.category}
              helperText={errors.category}
              error={errors.category ? true : false}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  category: event.target.value,
                })
              }
              label="Category"
              type="text"
            />
            <FormControl required style={{ minWidth: 180 }}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                label="Type"
                value={dialogValue.type}
                error={errors.type ? true : false}
                onChange={(event) =>
                  setDialogValue({ ...dialogValue, type: event.target.value })
                }
              >
                <MenuItem value="expenses" key="1">
                  {"Expenses"}
                </MenuItem>
                <MenuItem value="Income" key="2">
                  {"Income"}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {message && (
        <SnackBar
          isOpened={snackbarIsOpened}
          message={message}
          handleSnackBarClose={() => openSnackbar(false)}
        />
      )}
    </>
  );
};

export default SelectWithAddOption;
