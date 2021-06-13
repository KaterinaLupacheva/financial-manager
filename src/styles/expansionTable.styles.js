export const expansionTableStyles = theme => ({
  root: {
    margin: 8,
    [theme.breakpoints.down("md")]: {
      width: "100vw"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.errorText
  },
  green: {
    color: theme.palette.primary.greenBg
  }
});
