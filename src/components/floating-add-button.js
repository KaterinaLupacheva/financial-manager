import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DialogForm from "./dialog-form";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    top: "auto",
    left: "auto",
    bottom: 20,
    right: 20,
    position: "fixed"
  }
}));

const FloatingAddButton = ({ handleSubmit }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogForm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default FloatingAddButton;
