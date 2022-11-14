import invariant from "tiny-invariant";
import { axiosClient } from "../constants";
import { UserDetails, UserProfileEditForm } from "../types/user";

export const login = async (username: string, password: string) => {
  const response = await axiosClient.post("/login", { username, password });
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.headers.authorization}`;
  invariant(response.headers.authorization, "No authorization header");
  localStorage.setItem("gaming-token", response.headers.authorization);
};

export const register = async (
  username: string,
  password: string,
  displayName: string
) => {
  const response = await axiosClient.post("/register", {
    username,
    password,
    displayName,
  });
  invariant(response.headers.authorization, "No authorization header");
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.headers.authorization}`;
  localStorage.setItem("gaming-token", response.headers.authorization);
};

export const getUserDetails = async (
  userName: string
): Promise<UserDetails> => {
  const response = await axiosClient.get(`/${userName}/details`);
  return response.data;
};

export const followUser = async (userName: string) => {
  const response = await axiosClient.post(`/follow/${userName}`);
  return response.data;
};

export const unfollowUser = async (userName: string) => {
  const response = await axiosClient.delete(`/follow/${userName}`);
  return response.data;
};

export const updateUserProfile = async (editForm: UserProfileEditForm) => {
  return await axiosClient.patch("/me/details", editForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUserBannerPosition = async (position: number) => {
  return await axiosClient.patch("/me/details/banner", { position });
};
