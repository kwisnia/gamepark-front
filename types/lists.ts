import { GameListElement } from "./game";

export interface GameList {
  avatarUrl: string;
  description: string;
  id: number;
  name: string;
}

export interface GameListDetails extends GameList {
  games: GameListElement[];
}
