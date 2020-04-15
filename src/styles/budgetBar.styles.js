export const budgetBarStyles = theme => ({
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
    height: '20px',
    "& button": {
      padding: "0 0 0 10px"
    }
  }
});
