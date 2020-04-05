export const budgetBarStyles = {
  root: {
    width: "100%",
    height: "20px",
    borderRadius: "10px"
    // margin: "10px 0 20px 0"
  },
  bar: props => ({
    background: `${props.bgcolor}`
  }),
  dataContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "40px 0 0 20px"
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column"
  },
  barWithIcons: {
    display: "flex",
    margin: "10px 0 20px 0",
    "& button": {
      padding: "0 0 0 10px"
    }
  }
};
