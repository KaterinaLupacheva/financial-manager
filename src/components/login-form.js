import React, { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { formStyles } from "../styles/form.styles";
import UserContext from "../contexts/user.context";
import SimpleBackdrop from "./simple-backdrop";
import { doSignInUserWithEmailAndPassword } from "../firebase/firebase";

import { Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(formStyles);

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await doSignInUserWithEmailAndPassword(email, password);
      setIsLoading(false);
      setUser();
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
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
            className={classes.textfield}
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Login
          </Button>
          <br />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
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
