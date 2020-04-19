import styled from "styled-components";

export const FooterContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;

  a {
    text-decoration: none;
  }

  .developed {
    margin-left: 1vw;
  }

  .source {
    margin-right: 2vw;

    svg {
      margin-right: 0.5vw;
    }
  }
`;
