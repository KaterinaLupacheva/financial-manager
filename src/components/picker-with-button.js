import React from 'react';
import Box from '@material-ui/core/Box';
import CustomDatePicker from './date-picker';
import AddButton from './add-button';

const PickerWithButton = ({changeDate}) => (
    <div style={{ width: '100%' }}>
        <Box display='flex' justifyContent="space-evenly" m={1} p={1}>
            <CustomDatePicker changeDate={changeDate}/>
            <AddButton />
        </Box>
    </div>
);

export default PickerWithButton;