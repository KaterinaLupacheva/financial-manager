import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
  border-radius: 50px;
  background-color: ${props => props.mainbgcolor};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  .filler {
    background: ${props => props.bgcolor};
    height: 100%;
    border-radius: inherit;
    transition: width 0.5s ease-in;
    width: ${props => (props.percentage ? `${props.percentage}%` : `0%`)};
    text-align: right;

    span {
      padding: 4px;
      color: white;
      font-weight: bold;
    }
  }
`;
