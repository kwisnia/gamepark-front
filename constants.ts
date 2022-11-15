import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.gamepark.space"
    : "http://localhost:8080";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});
