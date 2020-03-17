import React, {useState} from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';

const CustomDatePicker = ({changeDate}) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
            minDate={new Date('2020-01-01')}
            maxDate={new Date()}
            openTo="month"
            views={["year", "month"]}
            value={selectedDate}
            onChange={(e) => {
                changeDate(format(e, 'MMMM'));
                handleDateChange(e);
            }}
        />
    </MuiPickersUtilsProvider>
)};

export default CustomDatePicker;