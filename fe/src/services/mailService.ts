import { useAxiosInstance } from "@/utils/axiosinstance";

export const useMailService = () => {
  const axiosinstance = useAxiosInstance();

  const sendMail = async (content: string): Promise<void> =>
    (await axiosinstance.post<void>("/api/v1/mail", content)).data;

  return {
    sendMail,
  };
};
