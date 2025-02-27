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

export interface Image {
  id: string;
  bucket: string;
}

export interface Skill {
  id?: string;
  name: string;
  icon: Image;
}

export const generateImageUrl = (image: Image | undefined): string => {
  if (!image) return "";
  return `${import.meta.env.VITE_MINIO_URL}/${image.bucket}/${image.id}`;
};
