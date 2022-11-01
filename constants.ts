import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
});
