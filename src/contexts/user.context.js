import { createContext } from "react";

const UserContext = createContext({
  authenticated: false,
  email: "",
  setUser: () => {},
  logoutUser: () => {}
});

export default UserContext;
