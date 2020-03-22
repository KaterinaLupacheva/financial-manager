import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    },
    margin: 0,
    top: "auto",
    left: "auto",
    bottom: 20,
    right: 20,
    position: "fixed"
  }
}));

const FloatingAddButton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
};

export default FloatingAddButton;
