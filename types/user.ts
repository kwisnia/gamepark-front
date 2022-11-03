import { GameList } from "./lists";

export interface UserDetails {
  email: string;
  username: string;
  id: number;
  avatar: string | null;
  bio: string | null;
  displayName: string;
  lists: GameList[];
  followerCount: number;
  followingCount: number;
}

export type BasicUserDetails = Pick<
  UserDetails,
  | "id"
  | "username"
  | "displayName"
  | "avatar"
  | "followerCount"
  | "followingCount"
  | "bio"
>;

export interface UserProfileEditForm {
  displayName: string;
  bio: string;
  avatar: File | null;
  banner: File | null;
  removeBanner: boolean;
}
