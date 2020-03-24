import { createContext } from "react";

const UserContext = createContext({
  authenticated: false,
  email: "",
  setUser: () => {}
});

export default UserContext;
