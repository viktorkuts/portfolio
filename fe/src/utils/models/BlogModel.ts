import type { Visibility } from "@/utils/models/Shared";

export interface BlogPostResponse {
  postId: string;
  title: string;
  content: string;
  authorId: string;
  publicationDate: string;
  visibility: Visibility;
}

export interface BlogPostRequest {
  title: string;
  content: string;
  visibility: Visibility;
}
