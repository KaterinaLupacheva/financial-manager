import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';

const CustomDatePicker = ({changeDate}) => {
    return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
            minDate={new Date('2020-01-01')}
            maxDate={new Date()}
            variant="inline"
            openTo="month"
            views={["year", "month"]}
            value={new Date()}
            onChange={(e) => changeDate(format(e, 'yyyy-MM-dd'))}
        />
    </MuiPickersUtilsProvider>
)};

export default CustomDatePicker;