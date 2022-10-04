import useSWRImmutable from "swr/immutable";

const useUserDetails = (user: string) => {
  const { data, error, mutate } = useSWRImmutable(`/${user}/details`);

  const loading = !data && !error;

  return {
    loading,
    user: data,
  };
};

export default useUserDetails;
