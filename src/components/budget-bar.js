import React, { useState, useEffect } from "react";
import { makeStyles, lighten } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "20px",
    borderRadius: "10px",
    margin: "10px 0 20px 0"
  },
  bar: props => ({
    background: `${props.bgcolor}`
  }),
  dataContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "40px 0 0 20px"
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column"
  }
}));

const BudgetBar = ({ data }) => {
  const props = { bgcolor: data.barColor };
  const classes = useStyles(props);
  const [completed, setCompleted] = useState(0);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const calculateCompleted =
      (parseInt(data.spent) / parseInt(data.budget)) * 100;
    setCompleted(calculateCompleted);

    const calcuateRemaining = parseInt(data.budget) - parseInt(data.spent);
    setRemaining(calcuateRemaining);
  }, []);

  return (
    <div style={{ width: "50vw" }}>
      <div className={classes.dataContainer}>
        <Typography variant="h6">{data.category}</Typography>
        <div className={classes.rightContainer}>
          <Typography variant="caption">{"Remaining / Budget"}</Typography>
          <Typography>{`${remaining} / ${data.budget}`}</Typography>
        </div>
      </div>
      <LinearProgress
        className={`${classes.root} ${classes.bar}`}
        variant="determinate"
        value={completed}
        color="secondary"
      />
      <Divider />
    </div>
  );
};

export default BudgetBar;
