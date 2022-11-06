import { GameListElement, Platform } from "./game";
import { BasicUserDetails, UserDetails } from "./user";

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
  platform: number | null;
  completionStatus: GameCompletionStatus;
  containsSpoilers: boolean;
}

export interface UserReview {
  id: number;
  rating: number;
  helpfulCount: number;
  platformID: number | null;
  platform: Platform | null;
  gameCompletionID: GameCompletionStatus;
  title: string;
  creator: number;
  containsSpoilers: boolean;
  body: string;
  game: string;
  user: BasicUserDetails;
  markedAsHelpful: boolean;
  gameDetails?: GameListElement;
}
