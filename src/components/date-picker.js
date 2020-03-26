import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  input: {
    color: theme.palette.secondary.text,
    width: 150,
    borderRadius: "10px",
    background: theme.palette.secondary.main,
    height: "7vh"
  }
}));

const CustomDatePicker = ({ changeDate }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk={true}
        label="Chose month"
        minDate={new Date("2020-01-01")}
        maxDate={new Date()}
        openTo="month"
        views={["year", "month"]}
        value={selectedDate}
        onChange={e => {
          changeDate(e);
          handleDateChange(e);
        }}
        InputProps={{ className: classes.input, disableUnderline: true }}
        inputProps={{ min: 0, style: { textAlign: "center" } }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
