import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    minWidth: "10vw"
  }
}));

const AddButton = ({ handleClickOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddCircle />}
        onClick={handleClickOpen}
      >
        Add
      </Button>
    </div>
  );
};

export default AddButton;
