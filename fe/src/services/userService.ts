import { useAxiosInstance } from "@/utils/axiosinstance";
import { UserInfo, UserResponse } from "@/utils/models/User";

export const useUserService = () => {
  const axiosinstance = useAxiosInstance();

  const getMyUser = async (): Promise<UserResponse> =>
    (await axiosinstance.get<UserResponse>("/api/v1/users/current-user")).data;

  const registerProfile = async (req: UserInfo): Promise<UserResponse> =>
    (await axiosinstance.post<UserResponse>("/api/v1/users", req)).data;

  return {
    getMyUser,
    registerProfile,
  };
};
