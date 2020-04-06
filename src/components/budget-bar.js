import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { budgetBarStyles } from "../styles/budgetBar.styles";
import CreateIcon from "@material-ui/icons/Create";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CustomProgressBar from "../components/custom-progress-bar";

const useStyles = makeStyles(budgetBarStyles);

const BudgetBar = ({ data, editBudget, deleteBudget }) => {
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
      <div className={classes.barWithIcons}>
        <CustomProgressBar bgcolor={data.barColor} percentage={completed} />
        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={() => editBudget(data)}>
            <CreateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => deleteBudget(data)}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Divider />
    </div>
  );
};

export default BudgetBar;
