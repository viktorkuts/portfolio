import type { Address } from "./Shared";

export enum UserType {
  USER = "USER",
  GUEST = "GUEST",
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Address;
}

export interface UserResponse {
  email: string;
  type: UserType;
  userInfo: UserInfo;
}
