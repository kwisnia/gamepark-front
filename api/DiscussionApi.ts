import { axiosClient } from "../constants";
import { DiscussionForm, DiscussionPostForm } from "../types/discussion";

export const createDiscussion = async (game: string, form: DiscussionForm) => {
  return axiosClient.post(`/games/${game}/discussions`, form);
};

export const createDiscussionPost = async (
  game: string,
  discussionId: number,
  form: DiscussionPostForm
) => {
  return axiosClient.post(
    `/games/${game}/discussions/${discussionId}/posts`,
    form
  );
};

export const scoreDiscussion = async (
  game: string,
  discussionId: number,
  score: number
) => {
  return axiosClient.post(`/games/${game}/discussions/${discussionId}/score`, {
    score,
  });
};

export const scoreDiscussionPost = async (
  game: string,
  discussionId: number,
  postId: number,
  score: number
) => {
  return axiosClient.post(
    `/games/${game}/discussions/${discussionId}/posts/${postId}/score`,
    {
      score,
    }
  );
};

export const deleteDiscussionPost = async (
  game: string,
  discussionId: number,
  postId: number
) => {
  return axiosClient.delete(
    `/games/${game}/discussions/${discussionId}/posts/${postId}`
  );
};

export const updateDiscussionPost = async (
  game: string,
  discussionId: number,
  postId: number,
  form: DiscussionPostForm
) => {
  return axiosClient.patch(
    `/games/${game}/discussions/${discussionId}/posts/${postId}`,
    form
  );
};
