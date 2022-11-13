import useSWRImmutable from "swr/immutable";
import { BasicUserDetails } from "../types/user";

const useUserDetails = (user: string) => {
  const { data, error, mutate } = useSWRImmutable<BasicUserDetails>(
    user ? `/${user}/details` : null
  );

  const isLoading = !data && !error;

  return {
    isLoading,
    user: data,
    mutate,
    error,
  };
};

export default useUserDetails;
