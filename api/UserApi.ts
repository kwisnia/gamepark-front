import invariant from "tiny-invariant";
import { axiosClient } from "../constants";
import { UserDetails } from "../types/user";

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post("/login", { email, password });
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.headers.authorization}`;
  invariant(response.headers.authorization, "No authorization header");
  localStorage.setItem("gaming-token", response.headers.authorization);
};

export const register = async (
  email: string,
  password: string,
  username: string,
  displayName: string
) => {
  const response = await axiosClient.post("/register", {
    email,
    password,
    username,
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
