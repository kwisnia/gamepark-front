import { useCallback, useState } from "react";
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

  const { data, setSize, mutate } = useSWRInfinite<BasicUserDetails[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    users: data,
    fetchNextPage,
    search,
    setSearch,
    mutate,
  };
};

export default useUsers;
