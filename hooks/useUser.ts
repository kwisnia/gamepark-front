import { useEffect } from "react";
import useSWR from "swr";
import { axiosClient } from "../constants";

const useUser = () => {
  const { data, mutate, error } = useSWR("/me/details");

  useEffect(() => {
    const token = localStorage.getItem("gaming-token");
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    mutate();
  }, [mutate]);

  const loading = !data && !error;
  const loggedOut = !!error && error.request.status === 401;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
};

export default useUser;
