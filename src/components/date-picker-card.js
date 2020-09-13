import React from "react";

import CustomDatePicker from "./date-picker";
import {
  StyledCard,
  StyledCardContent,
  CardInside,
} from "../styles/card.styles";
import { Typography } from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";
import { useTheme } from "@material-ui/core/styles";

const DatePickerCard = (props) => {
  const theme = useTheme();
  return (
    <StyledCard variant="outlined" bgcolor={theme.palette.secondary.ligthBlue}>
      <StyledCardContent style={{ paddingBottom: 0 }}>
        <TodayIcon fontSize="large" />
        <CardInside>
          <Typography variant="subtitle1">{props.title}</Typography>
          <CustomDatePicker changeDate={props.changeDate} />
        </CardInside>
      </StyledCardContent>
    </StyledCard>
  );
};

export default DatePickerCard;
