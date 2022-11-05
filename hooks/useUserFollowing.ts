import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { BasicUserDetails } from "../types/user";

const useUserFollowing = (username: string, pageSize: number = 50) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: BasicUserDetails[] | undefined) => {
      if (!username) return null;
      if (previousPageData && !previousPageData.length) return null;
      return `/${username}/following?page=${
        pageIndex + 1
      }&pageSize=${pageSize}`;
    },
    [username, pageSize]
  );

  const { data, setSize, mutate } = useSWRInfinite<BasicUserDetails[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    following: data,
    fetchNextPage,
    mutate,
  };
};

export default useUserFollowing;
