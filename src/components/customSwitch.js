import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { StyledSwitch } from "../styles/switch.styles";

const CustomSwitch = ({ initialState, categories, handleSubmit }) => {
  const [state, setState] = useState(initialState);

  const handleChange = event => {
    const tempState = { ...state, [event.target.name]: event.target.checked };
    setState({ ...state, [event.target.name]: event.target.checked });
    handleSubmit(tempState);
  };

  return (
    <>
      {Object.keys(state).length > 0 && (
        <FormGroup row={true} style={{ padding: "20px" }}>
          {categories.map(item => {
            return (
              <FormControlLabel
                key={item.name}
                control={
                  <StyledSwitch
                    switchcolor={item.color}
                    checked={state[item.name]}
                    onChange={handleChange}
                    name={item.name}
                  />
                }
                label={item.name}
              />
            );
          })}
        </FormGroup>
      )}
    </>
  );
};

export default CustomSwitch;
