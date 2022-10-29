import { axiosClient } from "../constants";
import { GameDetails, GameListElement } from "../types/game";

export const getGame = async (slug: string) => {
  const response = await axiosClient.get<GameDetails | null>(`/games/${slug}`);
  return response.data;
};

export const getGameShortInfo = async (slug: string) => {
  const response = await axiosClient.get<GameListElement | null>(
    `/games/${slug}/info`
  );
  return response.data;
};
