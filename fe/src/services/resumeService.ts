import { useAxiosInstance } from "@/utils/axiosinstance";
import { PatchInfo, ResumeResponse } from "@/utils/models/ResumeModel";
import { WorkRequest, WorkResponse } from "@/utils/models/WorkModel";

export const useResumeService = () => {
  const axiosinstance = useAxiosInstance();

  const getMainResume = async (): Promise<ResumeResponse> =>
    (await axiosinstance.get<ResumeResponse>("/api/v1/resumes/main")).data;

  const addWorkToResume = async (req: WorkRequest): Promise<WorkResponse> =>
    (await axiosinstance.post("/api/v1/resumes/main/works", req)).data;

  const deleteWorkFromResume = async (workId: string): Promise<void> =>
    await axiosinstance.delete("/api/v1/resumes/main/works/" + workId);

  const updateWorkToResume = async (
    req: WorkRequest,
    workId: string
  ): Promise<WorkResponse> =>
    (await axiosinstance.put("/api/v1/resumes/main/works/" + workId, req)).data;

  const patchInfo = async (req: PatchInfo): Promise<ResumeResponse> =>
    (await axiosinstance.patch("/api/v1/resumes/main/info", req)).data;

  return {
    getMainResume,
    addWorkToResume,
    deleteWorkFromResume,
    updateWorkToResume,
    patchInfo,
  };
};
