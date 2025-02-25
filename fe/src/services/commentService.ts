import { useAxiosInstance } from "@/utils/axiosinstance";
import {
  CommentRequest,
  CommentResponse,
  CommentStatus,
} from "@/utils/models/Comments";

export const useCommentService = () => {
  const axiosinstance = useAxiosInstance();

  const getPublicTestimonials = async (): Promise<CommentResponse[]> =>
    (
      await axiosinstance.get<CommentResponse[]>(
        "/api/v1/comments/testimonials"
      )
    ).data;

  const getPendingTestimonials = async (): Promise<CommentResponse[]> =>
    (
      await axiosinstance.get<CommentResponse[]>(
        "/api/v1/comments/testimonials?status=PENDING"
      )
    ).data;

  const addTestimonial = async (
    req: CommentRequest
  ): Promise<CommentResponse> =>
    (
      await axiosinstance.post<CommentResponse>(
        "/api/v1/comments/testimonials",
        req
      )
    ).data;

  const approveTestimonial = async (commentId: string) => {
    await axiosinstance.patch("/api/v1/comments/" + commentId + "/status", {
      status: CommentStatus.APPROVED,
    });
  };

  const deleteTestimonial = async (commentId: string) => {
    await axiosinstance.patch("/api/v1/comments/" + commentId + "/status", {
      status: CommentStatus.REJECTED,
    });
  };

  return {
    getPublicTestimonials,
    addTestimonial,
    getPendingTestimonials,
    approveTestimonial,
    deleteTestimonial,
  };
};
