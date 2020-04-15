const tabsBarStyle = (theme) => ({
  displayNone: {
    display: "none !important",
  },
  tabsRoot: {
    minHeight: "unset !important",
    overflowX: "visible",
    "& $tabRootButton": {
      fontSize: "0.875rem",
    },
  },
  tabRootButton: {
    minHeight: "unset !important",
    minWidth: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    padding: "10px 15px",
    borderRadius: "3px",
    lineHeight: "24px",
    border: "0 !important",
    backgroundColor: theme.palette.primary.main,
    marginLeft: "4px",
    width: "25vw",
    [theme.breakpoints.down("md")]: {
      width: "30vw",
      marginLeft: "10px",
    },
  },
  tabSelected: {
    backgroundColor: theme.palette.primary.darkPurpleBg,
    color: "#FFF !important",
    transition: "0.2s background-color 0.1s",
  },
  tabWrapper: {
    display: "inline-block",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    fontWeight: "500",
    fontSize: "12px",
    marginTop: "1px",
    "& > svg,& > .material-icons": {
      verticalAlign: "middle",
      margin: "-1px 5px 0 0 !important",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  cardStyles: {
    margin: 20,
  },
});

export default tabsBarStyle;
