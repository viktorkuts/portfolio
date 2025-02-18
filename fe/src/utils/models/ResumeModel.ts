import type { UserInfo } from "./Shared";
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
}
