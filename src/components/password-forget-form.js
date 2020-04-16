import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formStyles } from "../styles/form.styles";
import { doPasswordReset } from "../firebase/firebase";

const PasswordForgetForm = ({ showMessage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const useStyles = makeStyles(formStyles);
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    doPasswordReset(email)
      .then(() => {
        showMessage(email);
      })
      .catch((err) => {
        console.log("ERROR " + err);
        setError(err);
      });
  };
  return (
    <Grid container className={classes.root}>
      <Grid item sm />
      <Grid item sm>
        <Typography className={classes.title}>
          Please, enter your email
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
          <Button type="submit" variant="contained" className={classes.button}>
            Reset Password
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default PasswordForgetForm;
