import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { axiosClient } from "../constants";
import { UserDetails } from "../types/user";

const useLoggedInUser = () => {
  const { data, mutate, error } = useSWR<UserDetails>("/me/details", {
    refreshInterval: 30000,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("gaming-token");
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    mutate().then(() => setIsInitialized(true));
  }, [mutate]);

  const loading = !data && !error;
  const loggedOut = useMemo(
    () => Boolean(error) && error.request.status === 401,
    [error]
  );

  return {
    loading,
    isInitialized,
    loggedOut,
    user: data,
    mutate,
  };
};

export default useLoggedInUser;
