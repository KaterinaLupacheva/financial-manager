import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'

const CustomDatePicker = ({changeDate}) => {
    return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
            value={new Date()}
            onChange={(e) => changeDate(format(e, 'yyyy-MM-dd'))}
            minDate={new Date('2020-01-01')}
            maxDate={new Date()}
        />
    </MuiPickersUtilsProvider>
)};

export default CustomDatePicker;