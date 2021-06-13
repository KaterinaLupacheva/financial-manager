export const dialogStyles = (theme) => ({
  toggleContainer: {
    margin: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(2, 0, 0, 2),
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
  fieldsContainer: {
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    minWidth: 195,
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
  field: {
    width: "30ch",
  },
});
