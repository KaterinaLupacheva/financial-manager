import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { theme } from "@material-ui/core/styles";

export const StyledSwitch = styled(Switch)`
  .Mui-checked {
    color: ${props => props.switchcolor};
  }
  .Mui-checked + .MuiSwitch-track {
    background-color: ${props => props.switchcolor};
  }
`;

export const StyledButton = styled(Button)`
  background-color: #a7ffeb;
  margin: 30px;
`;
