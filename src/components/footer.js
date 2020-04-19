import React from "react";
import Typograhpy from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import { FooterContainer } from "../styles/footer.styles";

const Footer = () => (
  <FooterContainer>
    <Typograhpy className="developed">
      {`Developed by `}
      <a href="https://ramonak.io" target="_blank" rel="noopener noreferrer">
        {`Katsiaryna (Kate) Lupachova`}
      </a>
    </Typograhpy>
    <Typograhpy className="source">
      <a
        href="https://github.com/KaterinaLupacheva/financial-manager"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
        {`Source `}
      </a>
    </Typograhpy>
  </FooterContainer>
);

export default Footer;
