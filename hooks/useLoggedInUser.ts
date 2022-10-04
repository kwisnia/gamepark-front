import { useEffect } from "react";
import useSWR from "swr";
import { axiosClient } from "../constants";
import { UserDetails } from "../types/user";

const useLoggedInUser = () => {
  const { data, mutate, error } = useSWR<UserDetails>("/me/details");

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

export default useLoggedInUser;
