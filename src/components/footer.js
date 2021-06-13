import React from "react";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import { FooterContainer } from "../styles/footer.styles";

const Footer = () => (
  <FooterContainer>
    <Typography className="developed">
      {`Developed by `}
      <a href="https://ramonak.io" target="_blank" rel="noopener noreferrer">
        {`Katsiaryna (Kate) Lupachova`}
      </a>
    </Typography>
    <Typography className="source">
      <a
        href="https://github.com/KaterinaLupacheva/financial-manager"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
        {`Source `}
      </a>
    </Typography>
  </FooterContainer>
);

export default Footer;
