import useSWRImmutable from "swr/immutable";
import { BasicUserDetails } from "../types/user";

const useUserDetails = (user: string) => {
  const { data, error, mutate } = useSWRImmutable<BasicUserDetails>(
    user ? `/${user}/details` : null
  );

  const loading = !data && !error;

  return {
    loading,
    user: data,
    mutate,
  };
};

export default useUserDetails;
