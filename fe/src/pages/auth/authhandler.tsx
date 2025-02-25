import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useLocation, useNavigate, useHistory } from "react-router";

type Props = {};

export const AuthHandler = (props: Props) => {
  const { isLoading, user, loginWithRedirect, logout, handleRedirectCallback } =
    useAuth0();

  handleRedirectCallback();

  useEffect(() => {
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
