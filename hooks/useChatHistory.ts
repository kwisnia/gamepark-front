import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { ChatMessage } from "../types/chat";

const useChatHistory = (username: string, pageSize: number = 50) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: ChatMessage[] | undefined) => {
      if (!Boolean(username)) {
        return null;
      }
      if (previousPageData && !previousPageData.length) return null;
      return `/chat/${username}?page=${pageIndex + 1}&pageSize=${pageSize}`;
    },
    [username, pageSize]
  );

  const { data, setSize, mutate, error } =
    useSWRInfinite<ChatMessage[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  const isLoading = !data && !error;

  return {
    messages: data,
    fetchNextPage,
    mutate,
    isLoading,
  };
};

export default useChatHistory;
