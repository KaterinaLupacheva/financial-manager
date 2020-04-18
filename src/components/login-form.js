import React, { useState, useContext } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { formStyles } from "../styles/form.styles";
import UserContext from "../contexts/user.context";
import SimpleBackdrop from "./simple-backdrop";

import { Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(formStyles);

const LoginForm = props => {
  const { setUser } = useContext(UserContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password
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
      })
      .catch(err => {
        setErrors(err.response.data);
        setIsLoading(false);
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
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button type="submit" variant="contained" className={classes.button}>
            Login
          </Button>
          <br />
          <small>
            Don't have an account? Signup <Link to="/signup">here</Link>
          </small>
          <br />
          <small>
            <Link to="/pw-forgot">Forgot password?</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
      <SimpleBackdrop open={isLoading} />
    </Grid>
  );
};

export default withRouter(LoginForm);
