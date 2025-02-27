import type { Address, Image, Skill, UserInfo } from "./Shared";

export enum WorkStatus {
  PRESENT,
  ENDED,
}

export interface Company {
  name: string;
  phone?: string;
  email?: string;
  address?: Address;
}

export interface WorkResponse {
  id: string;
  location: Address;
  functionStart: Date;
  functionEnd: Date;
  position: string;
  positionFr: string;
  status: WorkStatus;
  description: string;
  descriptionFr: string;
  company: Company;
  contactPerson: UserInfo;
  resumeId: string;
  image: Image;
  skills: Skill[];
}

export interface WorkRequest {
  position: string;
  positionFr: string;
  description: string;
  descriptionFr: string;
  company: Company;
  image?: Image;
  skills: string[];
}
