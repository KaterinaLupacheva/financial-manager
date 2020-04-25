import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typograhpy from "@material-ui/core/Typography";
import Footer from "../components/footer";
import DemoAccountButton from "../components/demoAccountButton";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(5),
  },
}));

const StartPage = () => {
  const classes = useStyles();

  return (
    <>
      <Typograhpy variant="h1" align="left" className={classes.margin}>
        Financial Manager
      </Typograhpy>
      <Typograhpy variant="h4" align="left" className={classes.margin}>
        Simple app for keeping track of your cash flow
      </Typograhpy>
      <DemoAccountButton />
      <Footer />
    </>
  );
};

export default StartPage;
