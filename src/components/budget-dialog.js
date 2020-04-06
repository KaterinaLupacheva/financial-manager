import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { dialogStyles } from "../styles/dialog.styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from "@material-ui/core";
import axios from "axios";
import { ExpensesCategoriesContext } from "../contexts/expensesCategories.context";

const useStyles = makeStyles(dialogStyles);

const BudgetDialog = ({ open, handleClose, emptyCategories }) => {
  const INITIAL_STATE = {
    sum: "",
    category: ""
  };
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const { categories, setCategories } = useContext(ExpensesCategoriesContext);

  const classes = useStyles();

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
      saveData();
      clearForm();
    }
  };

  const saveData = () => {
    const tempObject = {
      ...categories,
      [state.category]: state.sum
    };
    const reqBody = {
      expensesCategories: tempObject
    };
    axios
      .post(
        `https://europe-west2-financial-manager-271220.cloudfunctions.net/api/user`,
        reqBody
      )
      .then(res => {
        setCategories({
          ...categories,
          [state.category]: state.sum
        });
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
        maxWidth="xl"
      >
        <DialogTitle id="form-dialog-title">Add budget</DialogTitle>
        <form noValidate onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box
              display="flex"
              alignItems="baseline"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <TextField
                autoFocus
                margin="normal"
                name="sum"
                label="Budget"
                value={state.sum}
                type="number"
                step="0.01"
                required={true}
                helperText={errors.sum}
                error={errors.sum ? true : false}
                onChange={handleChange}
                className={classes.budgetField}
              />
              <FormControl required className={classes.formControl}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={state.category}
                  error={errors.category ? true : false}
                  onChange={handleChange}
                  className={classes.selectEmpty}
                >
                  {emptyCategories &&
                    emptyCategories.map((cat, id) => (
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

export default BudgetDialog;
