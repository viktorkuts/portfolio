import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const AuthHandler = () => {
  const { isLoading, user, loginWithRedirect, logout, handleRedirectCallback } =
    useAuth0();

  handleRedirectCallback();

  useEffect(() => {
    console.log(user, isLoading);
    if (!isLoading && !user) {
      loginWithRedirect();
    } else {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    }
  }, [isLoading, loginWithRedirect, logout, user]);

  return <div>login</div>;
};
