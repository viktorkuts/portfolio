import { useAxiosInstance } from "@/utils/axiosinstance";
import { ProjectRequest, ProjectResponse } from "@/utils/models/Projects";
import { Image } from "@/utils/models/Shared";

export const useProjectService = () => {
  const axiosinstance = useAxiosInstance();

  const getProjects = async (): Promise<ProjectResponse[]> =>
    (await axiosinstance.get<ProjectResponse[]>("/api/v1/projects")).data;

  const addProject = async (
    project: ProjectRequest
  ): Promise<ProjectResponse> =>
    (await axiosinstance.post<ProjectResponse>("/api/v1/projects", project))
      .data;

  const updateProject = async (
    projecId: string,
    project: ProjectRequest
  ): Promise<ProjectResponse> =>
    (
      await axiosinstance.put<ProjectResponse>(
        "/api/v1/projects/" + projecId,
        project
      )
    ).data;

  const deleteProject = async (projectId: string): Promise<void> =>
    (await axiosinstance.delete<void>("/api/v1/projects/" + projectId)).data;

  const getProjectIcons = async (): Promise<Image[]> =>
    (await axiosinstance.get<Image[]>("/api/v1/projects/link-icons")).data;

  return {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    getProjectIcons,
  };
};
