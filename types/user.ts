import { GameList } from "./lists";

export interface UserDetails {
  email: string;
  username: string;
  id: number;
  avatar: string | null;
  bio: string;
  displayName: string;
  lists: GameList[];
  followerCount: number;
  followingCount: number;
  banner: string | null;
  bannerPosition: number;
  userUnlocks: {
    banner: boolean;
    avatar: boolean;
    animatedAvatar: boolean;
    animatedBanner: boolean;
  };
}

export type BasicUserDetails = Omit<UserDetails, "email" | "lists">;

export interface UserProfileEditForm {
  displayName: string;
  bio: string;
  avatar: File | null;
  banner: File | null;
  removeBanner: boolean;
}
