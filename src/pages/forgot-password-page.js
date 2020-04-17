import React, { useState } from "react";
import PasswordForgetForm from "../components/password-forget-form";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  text: {
    margin: "100px auto",
    width: "50vw"
  }
}));

const ForgotPasswordPage = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const classes = useStyles();

  const showMessage = email => {
    setSuccess(true);
    setEmail(email);
  };

  return (
    <>
      {success ? (
        <Typography
          className={classes.text}
        >{`Instructions on how to reset your password has been sent to ${email}. 
        Please, check your inbox.`}</Typography>
      ) : (
        <PasswordForgetForm showMessage={showMessage} />
      )}
    </>
  );
};

export default ForgotPasswordPage;
