export const pivotTableStyles = (theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  headStyle: {
    backgroundColor: theme.palette.primary.darkPurpleBg,
  },
  headCellStyle: {
    color: "#FFF",
    fontWeight: "bold",
  },
  title: {
    padding: "30px",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});
