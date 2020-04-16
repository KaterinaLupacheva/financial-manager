import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formStyles } from "../styles/form.styles";
import { doPasswordReset } from "../firebase/firebase";

const PasswordForgetForm = () => {
  const [email, setEmail] = useState("");
  const useStyles = makeStyles(formStyles);
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    doPasswordReset(email)
      .then(() => {
        setEmail("");
        console.log("RESETED");
      })
      .catch((err) => {
        console.log("ERROR " + err);
      });
  };
  return (
    <Grid container className={classes.root}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.title}>
          Password Forgot
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            // helperText={errors.email}
            // error={errors.email ? true : false}
            className={classes.textfield}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" className={classes.button}>
            Reset Password
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default PasswordForgetForm;
