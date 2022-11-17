import { useCallback, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { BasicUserDetails } from "../types/user";

const useUsers = (pageSize: number = 20) => {
  const [search, setSearch] = useState("");

  const getKey = useCallback(
    (pageIndex: number, previousPageData: BasicUserDetails[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/users?page=${
        pageIndex + 1
      }&pageSize=${pageSize}&search=${search.toLowerCase()}`;
    },
    [search, pageSize]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<BasicUserDetails[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const users = useMemo(() => data?.flat() ?? [], [data]);

  const isLoadingInitialData = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined" && !isReachingEnd;

  return {
    users,
    fetchNextPage,
    search,
    setSearch,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default useUsers;
