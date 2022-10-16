import { Platform } from "./game";

export enum GameCompletionStatus {
  MainStory = 0,
  MainPlusExtras = 1,
  Completionist = 2,
  Dropped = 3,
}

export interface ReviewForm {
  title: string;
  body: string;
  rating: number;
  platform: number;
  completionStatus: GameCompletionStatus;
  containsSpoilers: boolean;
}

export interface UserReview {
  id: number;
  rating: number;
  helpfulCount: number;
  platformID: number;
  platform: Platform;
  gameCompletionID: GameCompletionStatus;
  title: string;
  creator: string;
  containsSpoilers: boolean;
  body: string;
  game: string;
}
