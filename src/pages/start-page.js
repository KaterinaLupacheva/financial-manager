import React, { useEffect, useContext } from "react";
import UserContext from "../contexts/user.context";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Footer from "../components/footer";
import DemoAccountButton from "../components/demoAccountButton";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(5),
  },
}));

const StartPage = (props) => {
  const classes = useStyles();
  const { authenticated } = useContext(UserContext);
  const { firstStart, setFirstStart } = props;

  useEffect(() => {
    return () => {
      setFirstStart();
    };
  }, []);

  return firstStart && authenticated ? (
    <Redirect to="month" />
  ) : (
    <>
      <Typography variant="h1" align="left" className={classes.margin}>
        Financial Manager
      </Typography>
      <Typography variant="h4" align="left" className={classes.margin}>
        Simple app for keeping track of your cash flow
      </Typography>
      <DemoAccountButton />
      <Footer />
    </>
  );
};

export default StartPage;
