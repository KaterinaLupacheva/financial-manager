export const dialogStyles = (theme) => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  toggleButton: (props) => ({
    "&.Mui-selected": {
      backgroundColor:
        props.bgcolor === "expenses"
          ? `${theme.palette.secondary.palePink} !important`
          : `${theme.palette.secondary.lightBg} !important`,
    },
  }),
  row: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  formControl: {
    minWidth: 195,
  },
  buttons: {
    marginTop: 20,
  },
  button: {
    minWidth: "20%",
  },
  budgetField: {
    margin: 8,
    [theme.breakpoints.down("md")]: {
      marginBottom: 20,
    },
  },
});
