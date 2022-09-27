import { axiosClient } from "../constants";
import { GameDetails } from "../types/game";

export const getGame = async (slug: string) => {
  const response = await axiosClient.get<GameDetails | null>(`/games/${slug}`);
  return response.data;
};
