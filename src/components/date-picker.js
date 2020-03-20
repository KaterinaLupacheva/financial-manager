import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

const useStyles = makeStyles(theme => ({
  input: {
    color: "blue",
    width: 150,
    border: "1px solid blue",
    borderRadius: "10px"
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
          changeDate(format(e, "MMMM"));
          handleDateChange(e);
        }}
        InputProps={{ className: classes.input, disableUnderline: true }}
        inputProps={{ min: 0, style: { textAlign: "center" } }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
