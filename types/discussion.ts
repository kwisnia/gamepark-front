import type { GameListElement } from "./game";
import type { BasicUserDetails } from "./user";

export interface GameDiscussion {
  id: number;
  game: string;
  title: string;
  body: string;
  user: BasicUserDetails;
  score: number;
  userScore: number;
  postsCount: number;
  gameDetails?: GameListElement;
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
  user: BasicUserDetails;
  originalPostID: number | null;
  replyCount: number;
}

export type GameDiscussionListItem = Omit<GameDiscussion, "body">;

export interface DiscussionPostForm {
  body: string;
  originalPostID: number | null;
}
