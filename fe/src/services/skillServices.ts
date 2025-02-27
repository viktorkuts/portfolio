import { useAxiosInstance } from "@/utils/axiosinstance";
import { Skill } from "@/utils/models/Shared";

export const useSkillService = () => {
  const axiosinstance = useAxiosInstance();

  const addSkill = async (rq: Skill): Promise<Skill> => {
    return (await axiosinstance.post<Skill>("/api/v1/skills", rq)).data;
  };

  const updateSkill = async (id: string, rq: Skill): Promise<Skill> => {
    return (await axiosinstance.put<Skill>("/api/v1/skills/" + id, rq)).data;
  };

  const deleteSkill = async (id: string): Promise<void> => {
    return (await axiosinstance.delete<void>("/api/v1/skills/" + id)).data;
  };

  return {
    addSkill,
    updateSkill,
    deleteSkill,
  };
};
