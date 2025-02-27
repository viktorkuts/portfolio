import type { Image, Skill, UserInfo } from "./Shared";
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
  description: string;
  avatar: Image;
  skills: Skill[];
}

export interface PatchInfo {
  title: string;
  description: string;
}
