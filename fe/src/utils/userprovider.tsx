import { UserResponse } from "@/utils/models/User";
import { useAuth0 } from "@auth0/auth0-react";
import { createContext, JSX, useContext, useEffect, useState } from "react";
import { useUserService } from "@/services/userService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface UserContextInterface {
  user: UserResponse | undefined;
  isLoading: boolean;
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const { t } = useTranslation();
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(t("useUserContext has no context!"));
  }
  return context;
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const UserProvider = ({ children }: Props) => {
  const userService = useUserService();
  const { user, isAuthenticated } = useAuth0();
  const [sysUser, setSysUser] = useState<UserResponse | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const nav = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (isAuthenticated && user) {
      userService
        .getMyUser()
        .then((res) => {
          setSysUser(res);
          console.log("System User Set!");
        })
        .catch(() => {
          console.log("Error fetching current user..");
          nav("/profile-registration");
        });
    }
    setIsLoading(false);
    // only run the call if the auth0 state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated]);

  return (
    <UserContext.Provider value={{ user: sysUser, isLoading: isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
