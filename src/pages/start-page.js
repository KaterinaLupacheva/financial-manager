import React, { useState, useContext } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import UserContext from "../contexts/user.context";
import SimpleBackdrop from "../components/simple-backdrop";

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
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: "demo@demo.com",
      password: "111111"
    };
    setIsLoading(true);
    axios
      .post(
        "https://europe-west2-financial-manager-271220.cloudfunctions.net/api/login",
        userData
      )
      .then(res => {
        setIsLoading(false);
        setUser(res.data.token);
        window.location.href = "/month";
      })
      .catch(err => {
        setErrors(err.response.data);
        setIsLoading(false);
      });
  };

  return (
    <>
      {errors ? (
        <div>Something went wrong...</div>
      ) : (
        <>
          <Typography variant="h1" align="left" className={classes.margin}>
            Financial Manager
          </Typography>
          <Typography
            variant="h5"
            align="left"
            className={classes.subtitleMargin}
          >
            Simple app for keeping track of your cash flow
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.margin}
            onClick={handleSubmit}
          >
            Demo account
          </Button>
        </>
      )}
      <SimpleBackdrop open={isLoading} />
    </>
  );
};

export default StartPage;
