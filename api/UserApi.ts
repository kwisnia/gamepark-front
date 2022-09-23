import axios from "axios";
import { axiosClient } from "../constants";

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post("/login", { email, password });
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.headers.authorization}`;
  localStorage.setItem("gaming-token", response.headers.authorization);
};

export const register = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await axiosClient.post("/register", {
    email,
    password,
    username,
  });
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.headers.authorization}`;
  localStorage.setItem("gaming-token", response.headers.authorization);
};
