import React from "react";
import { ProgressBarContainer } from "../styles/custom-progress-bar.styles";

const CustomProgressBar = ({ bgcolor, percentage }) => {
  return (
    <ProgressBarContainer
      mainbgcolor={"#e0e0de"}
      bgcolor={bgcolor}
      percentage={percentage}
    >
      <div className="filler" />
    </ProgressBarContainer>
  );
};

export default CustomProgressBar;
