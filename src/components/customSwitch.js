import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import StyledSwitch from "../styles/switch.styles";

const CustomSwitch = () => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <StyledSwitch
            switchcolor="red"
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
          />
        }
        label="Custom color"
      />
    </FormGroup>
  );
};

export default CustomSwitch;
