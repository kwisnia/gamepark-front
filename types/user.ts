import { GameList } from "./lists";

export interface UserDetails {
  email: string;
  username: string;
  id: number;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  bio: string | null;
  displayName: string;
  lists: GameList[];
}

export type BasicUserDetails = Pick<
  UserDetails,
  "id" | "username" | "displayName" | "avatar"
>;
