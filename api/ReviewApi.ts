import { axiosClient } from "../constants";
import { ReviewForm } from "../types/review";

export const submitReview = async (review: ReviewForm, gameSlug: string) => {
  return axiosClient.post(`/games/${gameSlug}/reviews`, review);
};

export const removeReview = async (gameSlug: string) => {
  return axiosClient.delete(`/games/${gameSlug}/reviews`);
};

export const unmarkHelpful = async (gameSlug: string, reviewId: number) => {
  return axiosClient.delete(`/games/${gameSlug}/reviews/${reviewId}/helpful`);
};

export const markHelpful = async (gameSlug: string, reviewId: number) => {
  return axiosClient.post(`/games/${gameSlug}/reviews/${reviewId}/helpful`);
};
