import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  input: {
    color: theme.palette.secondary.text,
    borderRadius: "10px",
    background: theme.palette.secondary.main,
    height: "7vh",
    cursor: "pointer"
  }
}));

const CustomDatePicker = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk={true}
        maxDate={new Date()}
        openTo="month"
        views={["year", "month"]}
        value={selectedDate}
        onChange={e => {
          props.changeDate(e);
          handleDateChange(e);
        }}
        InputProps={{ className: classes.input, disableUnderline: true }}
        inputProps={{
          min: 0,
          style: { textAlign: "center", cursor: "pointer", fontSize: "1rem" }
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
