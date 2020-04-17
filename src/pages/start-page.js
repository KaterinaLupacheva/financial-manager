import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(5)
  },
  subtitleMargin: {
    marginLeft: theme.spacing(5)
  }
}));

const StartPage = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h1" align="left" className={classes.margin}>
        Financial Manager
      </Typography>
      <Typography variant="h5" align="left" className={classes.subtitleMargin}>
        Simple app for keeping track of your cash flow
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.margin}
      >
        Demo account
      </Button>
    </>
  );
};

export default StartPage;
