import { styled } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import { HorizontalBar } from "react-chartjs-2";
import Box from "@material-ui/core/Box";

export const StyledChartContainer = styled(Box)(({ theme }) => ({
  width: "50vw",
  margin: "0 auto",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    width: "unset",
  },
}));

export const StyledBarChart = styled(Bar)`
  canvas {
    margin: 0 auto;
    height: 100%;
  }
`;

export const StyledHorizontalBarChart = styled(HorizontalBar)`
  canvas {
    margin: 0 auto;
  }
`;
