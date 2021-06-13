import React from "react";
import { Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import SignupPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import ForgotPasswordPage from "./pages/forgot-password-page";

const UnAuthenticatedApp = () => {
  return (
    <>
      <Route path={ROUTES.SIGN_UP} component={SignupPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPasswordPage} />
    </>
  );
};

export default UnAuthenticatedApp;
