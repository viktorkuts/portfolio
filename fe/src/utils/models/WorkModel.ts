import type { Address, LocalizableString, UserInfo } from "./Shared";

export enum WorkStatus {
  PRESENT,
  ENDED,
}

export interface Company {
  name: string;
  phone: string;
  email: string;
  address: Address;
}

export interface WorkResponse {
  location: Address;
  functionStart: Date;
  functionEnd: Date;
  position: LocalizableString;
  status: WorkStatus;
  description: LocalizableString;
  company: Company;
  contactPerson: UserInfo;
  resumeId: string;
}
