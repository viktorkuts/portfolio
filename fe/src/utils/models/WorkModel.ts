import type { Address, UserInfo } from "./Shared";

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
  status: WorkStatus;
  description: string;
  company: Company;
  contactPerson: UserInfo;
  resumeId: string;
}

export interface WorkRequest {
  position: string;
  description: string;
  company: Company;
}
