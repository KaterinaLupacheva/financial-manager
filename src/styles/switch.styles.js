import { purple, green, yellow } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const StyledSwitch = withStyles({
  switchBase: {
    color: props => props.switchcolor,
    "&$checked": {
      color: green[500]
    },
    "&$checked + $track": {
      backgroundColor: yellow[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

export default StyledSwitch;
