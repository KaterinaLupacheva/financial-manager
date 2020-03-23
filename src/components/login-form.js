import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  title: {
    margin: "20px auto"
  },
  textfield: {
    margin: "10px auto"
  },
  button: {
    marginTop: 20
  }
}));

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password
    };

    axios
      .post(
        "https://europe-west2-financial-manager-271220.cloudfunctions.net/api/login",
        userData
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        setErrors(err.response.data);
      });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.title}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors.email}
            error={errors.email ? true : false}
            className={classes.textfield}
            value={email}
            onChange={event => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            className={classes.textfield}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default LoginForm;
