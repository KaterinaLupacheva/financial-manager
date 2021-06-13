import Switch from "@material-ui/core/Switch";
import styled from "styled-components";

export const StyledSwitch = styled(Switch)`
  .Mui-checked {
    color: ${props => props.switchcolor};
  }
  .Mui-checked + .MuiSwitch-track {
    background-color: ${props => props.switchcolor};
  }
`;
