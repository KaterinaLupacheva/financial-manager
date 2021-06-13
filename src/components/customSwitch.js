import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { StyledSwitch } from "../styles/switch.styles";
import { StyledButton } from "../styles/button.styles";
import { useTheme } from "@material-ui/core/styles";

const CustomSwitch = ({ initialState, categories, handleSubmit }) => {
  const theme = useTheme();
  const [state, setState] = useState(initialState);

  const handleChange = event => {
    const tempState = { ...state, [event.target.name]: event.target.checked };
    setState({ ...state, [event.target.name]: event.target.checked });
    handleSubmit(tempState);
  };

  const unselectAll = () => {
    let tempState = {};
    for (var key of Object.keys(state)) {
      tempState = {
        ...tempState,
        [state.key]: false
      };
    }
    setState(tempState);
    handleSubmit(tempState);
  };

  return (
    <>
      <StyledButton
        variant="contained"
        bgcolor={theme.palette.secondary.lightBg}
        onClick={unselectAll}
      >
        Unselect all
      </StyledButton>
      {Object.keys(state).length > 0 && (
        <FormGroup row={true}>
          {categories.map(item => {
            return (
              <FormControlLabel
                key={item.name}
                control={
                  <StyledSwitch
                    switchcolor={item.color}
                    checked={!!state[item.name]}
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
