import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SimpleBackdrop from "../components/simple-backdrop";
import UserContext from "../contexts/user.context";
import { doSignInWithEmailAndPassword } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(5),
  },
}));

const DemoAccountButton = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    doSignInWithEmailAndPassword("demo@demo.com", "111111")
      .then((data) => {
        setUser(data.user);
        setIsLoading(false);
        history.push("/month");
      })
      .catch((err) => {
        setErrors(err);
        setIsLoading(false);
      });

    // const userData = {
    //   email: "demo@demo.com",
    //   password: "111111",
    // };
    // setIsLoading(true);
    // axios
    //   .post(
    //     "https://europe-west2-financial-manager-271220.cloudfunctions.net/api/login",
    //     userData
    //   )
    //   .then((res) => {
    //     setIsLoading(false);
    //     setUser(res.data.token);
    //     window.location.href = "/month";
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.margin}
        onClick={handleSubmit}
      >
        Demo account
      </Button>
      <SimpleBackdrop open={isLoading} />
    </>
  );
};

export default DemoAccountButton;
