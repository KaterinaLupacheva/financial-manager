import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
  border-radius: 50px;
  background-color: ${props => props.mainbgcolor};

  .filler {
    background: ${props => props.bgcolor};
    height: 100%;
    border-radius: inherit;
    transition: width 0.5s ease-in;
    width: ${props => (props.percentage ? `${props.percentage}%` : `0%`)};
  }
`;
