export const dialogStyles = theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  },
  toggleButton: props => ({
    "&.Mui-selected": {
      backgroundColor:
        props.bgcolor === "expenses"
          ? `${theme.palette.secondary.palePink} !important`
          : `${theme.palette.secondary.lightBg} !important`
    }
  }),
  formControl: {
    minWidth: 195
  },
  sumField: {
    marginLeft: 20
  },
  detailsField: {
    marginRight: 20
  },
  buttons: {
    marginTop: 20
  },
  button: {
    minWidth: "20%"
  }
});
