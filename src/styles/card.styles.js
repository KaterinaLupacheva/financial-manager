import { styled, withTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

export const TopBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "40px",
  marginLeft: "40px",
  [theme.breakpoints.down("md")]: {
    width: "100vw",
    marginLeft: "0px",
    // flexDirection: "column",
  },
}));

export const StyledCard = styled(withTheme(Card))((props) => ({
  background: props.bgcolor,
  [props.theme.breakpoints.down("md")]: {
    width: "50vw",
  },
  margin: "20px",
  height: "15vh",
  width: "20vw",
}));

export const StyledCardContent = styled(CardContent)({
  display: "flex",
  padding: 0,
  height: "100%",
});

export const CardInside = styled(Box)(({ theme }) => ({
  padding: "10px",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    padding: "0 5px 0 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
  },
}));
