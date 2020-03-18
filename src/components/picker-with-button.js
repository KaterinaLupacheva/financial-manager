import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import CustomDatePicker from "./date-picker";
import AddButton from "./add-button";
import DialogForm from "./dialog-form";

const PickerWithButton = ({ changeDate }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-evenly"
        m={1}
        p={1}
        boxShadow={3}
      >
        <CustomDatePicker changeDate={changeDate} />
        <AddButton handleClickOpen={handleClickOpen} />
      </Box>
      <DialogForm open={open} />
    </div>
  );
};

export default PickerWithButton;
