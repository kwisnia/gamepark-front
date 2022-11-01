import { axiosClient } from "../constants";
import { GameDetails, IGDBImageSize } from "../types/game";

export const getCoverUrl = (
  cover: string,
  imageSize: IGDBImageSize,
  double: boolean
) => {
  return `https://images.igdb.com/igdb/image/upload/t_${imageSize}${
    double ? "_2x" : ""
  }/${cover}.jpg`;
};

export const getRandomImage = (game: GameDetails) => {
  if (game?.screenshots?.length) {
    const randomIndex = Math.floor(Math.random() * game.screenshots.length);
    return getCoverUrl(
      game.screenshots[randomIndex].imageId,
      IGDBImageSize.FullHD,
      false
    );
  } else if (game?.artworks?.length) {
    const randomIndex = Math.floor(Math.random() * game.artworks.length);
    return getCoverUrl(
      game.artworks[randomIndex].imageId,
      IGDBImageSize.FullHD,
      false
    );
  }
  return "";
};

export const uploadImage = async (file: File): Promise<string> => {
  if (file.size > 1000000) {
    return Promise.reject("File is too big");
  }
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await axiosClient.post("/image", formData);
    return response.data.url;
  } catch (error) {
    return Promise.reject(error);
  }
};
