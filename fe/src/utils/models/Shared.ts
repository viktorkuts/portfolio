export enum Visibility {
  PRIVATE,
  PUBLIC,
  UNLISTED,
}

export enum AlertType {
  INFO,
  WARN,
  ERROR,
}

export interface Address {
  street: string;
  city: string;
  postal: string;
  state: string;
  country: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}
