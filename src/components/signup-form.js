import React, { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { formStyles } from "../styles/form.styles";
import UserContext from "../contexts/user.context";
import SimpleBackdrop from "../components/simple-backdrop";
import {
  createUserProfileDocument,
  doCreateUserWithEmailAndPassword,
  doSendVerificationEmail,
  auth,
} from "../firebase/firebase";

import { Grid, Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(formStyles);

const SignupForm = () => {
  const { setUser } = useContext(UserContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);

    try {
      const { user } = await doCreateUserWithEmailAndPassword(email, password);
      await doSendVerificationEmail();
      await createUserProfileDocument(user);
      auth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            setUser(token);
          });
        }
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setOpen(false);
    }
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
            className={classes.textfield}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textfield}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textfield}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Signup
          </Button>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
      <SimpleBackdrop open={open} />
    </Grid>
  );
};

export default withRouter(SignupForm);
