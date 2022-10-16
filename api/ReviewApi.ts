import { axiosClient } from "../constants";
import { ReviewForm } from "../types/review";

export const submitReview = async (review: ReviewForm, gameSlug: string) => {
  return axiosClient.post(`/games/${gameSlug}/reviews`, review);
};
