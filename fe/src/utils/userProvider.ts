import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted, shallowRef, watch, type ShallowRef } from "vue";
import { useFetch } from "./fetch";
import type { UserResponse } from "./models/User";

interface UserExport {
  user: ShallowRef<UserResponse>;
  isLoading: ShallowRef<Boolean>;
  refreshUser: () => Promise<void>;
}

const sysuser: ShallowRef = shallowRef();
const isLoading: ShallowRef<Boolean> = shallowRef<boolean>(true);
export const useUser = (): UserExport => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const fetchUser = async () => {
    isLoading.value = true;
    if (isAuthenticated.value && user.value) {
      try {
        const response = await useFetch<UserResponse>(
          `${import.meta.env.BACKEND_URL}/api/v1/users/current-user`,
          {
            method: "GET",
            headers: new Headers({
              "content-type": "application/json",
              Authorization: `Bearer ${await getAccessTokenSilently()}`,
            }),
          }
        );
        sysuser.value = response.data;
      } catch (e) {
        console.log("Error getting current user: " + e);
      } finally {
        isLoading.value = false;
      }
    } else {
      isLoading.value = false;
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  onMounted(fetchUser);
  watch([user, isAuthenticated], fetchUser);

  const exp: UserExport = {
    user: sysuser,
    isLoading: isLoading,
    refreshUser: refreshUser,
  };

  return exp;
};
