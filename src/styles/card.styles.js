import { styled, withTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const StyledCard = styled(withTheme(Card))(props => ({
  background: props.bgColor,
  margin: "20px",
  height: "15vh",
  width: "20vw"
}));

export const StyledCardContent = styled(CardContent)({
  display: "flex",
  padding: 0
});
