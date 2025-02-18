import type { Visibility } from "./Shared";
import type { UserResponse } from "./User";

export enum CommentType {
  BLOG = "BLOG",
  TESTIMONIALS = "TESTIMONIALS",
}

export enum CommentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface CommentResponse {
  id: string;
  user: UserResponse;
  title: string;
  comment: string;
  commentType: CommentType;
  status: CommentStatus;
  visibility: Visibility;
}

export interface CommentRequest {
  title: string;
  comment: string;
}
