const drawerWidth = 240;

export const sidebarStyles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolBar: {
    width: "100vw"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background:
      "radial-gradient(80.99% 100% at 50% 0%, #00FF0A 0%, #36008E 100%), radial-gradient(50% 123.47% at 50% 50%, #EFE7C8 0%, #36008E 100%), linear-gradient(301.28deg, #FF006B 0%, #48DD9E 100%), linear-gradient(294.84deg, #5A60E4 0%, #D30000 100%), linear-gradient(52.29deg, #000000 0%, #00FF85 100%), radial-gradient(100% 138.69% at 100% 0%, #0007A5 0%, #FF7A00 100%), radial-gradient(70.41% 100% at 50% 0%, #D5B300 0%, #2200AA 100%)",
    "background-blend-mode":
      "screen, screen, lighten, overlay, lighten, difference, normal"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    [theme.breakpoints.down("md")]: {
      padding: "5px"
    }
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  selected: {
    backgroundColor: `${theme.palette.primary.darkPurpleBg} !important`,
    color: "white",
    fontWeight: 600
  }
});
