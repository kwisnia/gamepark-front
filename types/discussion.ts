import { UserDetails } from "./user";

export interface GameDiscussion {
  id: number;
  game: string;
  title: string;
  body: string;
  user: Pick<UserDetails, "displayName" | "username" | "id">;
  score: number;
  userScore: number;
  postsCount: number;
}

export interface DiscussionForm {
  title: string;
  body: string;
}

export interface DiscussionPost {
  id: number;
  body: string;
  score: number;
  userScore: number;
  user: Pick<UserDetails, "displayName" | "username" | "id">;
  originalPostID: number | null;
  replyCount: number;
}

export type GameDiscussionListItem = Omit<GameDiscussion, "body">;

export interface DiscussionPostForm {
  body: string;
  originalPostID: number | null;
}
