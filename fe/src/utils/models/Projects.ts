import { Image, ProfileLink, Skill } from "./Shared";

export interface ProjectResponse {
  id?: string;
  name: string;
  description: string;
  descriptionFr: string;
  image: Image;
  links: ProfileLink[];
  skills: Skill[];
}

export interface ProjectRequest {
  id?: string;
  name: string;
  description: string;
  descriptionFr: string;
  image: Image;
  links: ProfileLink[];
  skills: string[];
}
