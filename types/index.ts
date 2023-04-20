export interface User {
  id: string;
  avatar: string;
  name: string;
}
export interface Message {
  id: string;
  userId: string;
  createdAt: Date;
  text: string;
}
export type AsyncState = null | "loading" | "error" | "complete";
export type SocialPlatforms = "twitter" | "facebook";
