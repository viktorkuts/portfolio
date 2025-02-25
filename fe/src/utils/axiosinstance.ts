import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosInstance } from "axios";

export const useAxiosInstance = (): AxiosInstance => {
  const { getAccessTokenSilently, user } = useAuth0();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (config) => {
    if (!user) return config;
    try {
      const token = await getAccessTokenSilently();
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.log(err);
    }

    return config;
  });

  instance.interceptors.response.use((response) => response);

  return instance;
};
