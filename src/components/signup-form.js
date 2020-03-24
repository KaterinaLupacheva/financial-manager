import React, { useState, useContext } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { formStyles } from "../styles/form.styles";
import UserContext from "../contexts/user.context";

import { Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(formStyles);

const SignupForm = props => {
  const { setUser } = useContext(UserContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword
    };

    axios
      .post("/signup", newUserData)
      .then(res => {
        setUser(res.data.token);
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
          Signup
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            className={classes.textfield}
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button type="submit" variant="contained" className={classes.button}>
            Signup
          </Button>
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withRouter(SignupForm);
