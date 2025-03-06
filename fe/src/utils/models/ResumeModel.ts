import { ProjectResponse } from "./Projects";
import type { Image, ProfileLink, Skill, UserInfo } from "./Shared";
import type { WorkResponse } from "./WorkModel";

export enum ResumeStatus {
  MAIN,
  SIDE,
}

export interface ResumeResponse {
  user: UserInfo;
  userId: string;
  works: WorkResponse[];
  status: ResumeStatus;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  avatar: Image;
  skills: Skill[];
  links: ProfileLink[];
  projects: ProjectResponse[];
}

export interface PatchInfo {
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  links: ProfileLink[];
}
