import useSWR from "swr";

const useUser = () => {
  const { data, mutate, error } = useSWR("/me/details");

  const loading = !data && !error;
  const loggedOut = error && error.request.status === 401;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
};

export default useUser;
