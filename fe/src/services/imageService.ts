import { useAxiosInstance } from "@/utils/axiosinstance";
import { Image } from "@/utils/models/Shared";

export const useImageService = () => {
  const axiosinstance = useAxiosInstance();

  const addImage = async (rq: File): Promise<Image> => {
    const form = new FormData();
    form.append("files", rq);
    return (
      await axiosinstance.post<Image>("/api/v1/images", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  };

  const updateImage = async (id: string, rq: File): Promise<Image> => {
    const form = new FormData();
    form.append("files", rq);
    return (
      await axiosinstance.put<Image>("/api/v1/images/" + id, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  };

  return {
    addImage,
    updateImage,
  };
};
