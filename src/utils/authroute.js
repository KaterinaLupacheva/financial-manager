import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../contexts/user.context";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/month" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
