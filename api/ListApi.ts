import { axiosClient } from "../constants";

export const createList = (name: string, description: string) => {
  return axiosClient.post("/list", { name, description });
};

export const updateList = (id: number, name: string, description: string) => {
  return axiosClient.patch(`/list/${id}`, { name, description });
};

export const removeList = (id: number) => {
  return axiosClient.delete(`/list/${id}`);
};

export const addToList = (listId: number, slug: string) => {
  return axiosClient.post(`/list/${listId}/add`, { slug });
};

export const removeFromList = (listId: number, slug: string) => {
  return axiosClient.post(`/list/${listId}/remove`, { slug });
};
