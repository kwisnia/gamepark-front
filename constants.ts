import axios from "axios";

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "localhost:8080"
    : "api.gamepark.space";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${API_URL}`
    : `http://${API_URL}`;

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});
