import Button from "@material-ui/core/Button";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  background-color: ${props => props.bgcolor};
  margin: 30px;
`;
