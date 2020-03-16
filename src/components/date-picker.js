import React from 'react';
import TextField from '@material-ui/core/TextField';

const DatePicker = ({changeDate}) => (
    <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue="2020-01-01"
        onChange={(e) => changeDate(e)}
    />
);

export default DatePicker;