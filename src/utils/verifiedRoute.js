import React, { useState } from "react";
import { Route } from "react-router-dom";
import { auth, doSendVerificationEmail } from "../firebase/firebase";

const VerifiedRoute = ({ component: Component, ...rest }) => {
  const [isSent, setIsSet] = useState(false);
  const authUser = auth.currentUser;

  const needsEmailVerification = authUser =>
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
      .map(provider => provider.providerId)
      .includes("password");

  const onSendEmailVerification = () => {
    doSendVerificationEmail().then(() => setIsSet(true));
  };

  return (
    <Route
      {...rest}
      render={props =>
        needsEmailVerification(authUser) ? (
          <div>
            {isSent ? (
              <p>
                One last step: Please check your inbox to confirm your email.
                Refresh this page once you confirmed your email.
              </p>
            ) : (
              <p>
                One last step: Please check your inbox to confirm your email or
                send another confirmation E-Mail.
              </p>
            )}

            <button
              type="button"
              onClick={onSendEmailVerification}
              disabled={isSent}
            >
              Send confirmation E-Mail
            </button>
          </div>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default VerifiedRoute;
