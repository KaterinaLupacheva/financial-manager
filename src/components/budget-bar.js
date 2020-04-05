import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "10px",
    marginTop: theme.spacing(2)
  }
}));

const BudgetBar = ({ data }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const calculateCompleted =
      (parseInt(data.spent) / parseInt(data.budget)) * 100;
    setCompleted(calculateCompleted);
  }, []);

  return (
    <div>
      <LinearProgress
        className={classes.root}
        variant="determinate"
        value={completed}
      />
    </div>
  );
};

export default BudgetBar;
