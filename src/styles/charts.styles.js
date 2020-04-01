import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { HorizontalBar } from "react-chartjs-2";

export const StyledChartContainer = styled.div`
  width: 50vw;
  margin: 0 auto;
  text-align: center;
`;

export const StyledBarChart = styled(Bar)`
  canvas {
    margin: 0 auto;
  }
`;

export const StyledHorizontalBarChart = styled(HorizontalBar)`
  canvas {
    margin: 0 auto;
  }
`;
