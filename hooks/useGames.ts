import { useCallback, useState } from "react";
import { GameListElement, GamePageResponse } from "../types/game";
import { SWRInfiniteKeyLoader } from "swr/infinite";
import useSWRInfinite from "swr/infinite";

const getKey: SWRInfiniteKeyLoader = (
  pageIndex: number,
  previousPageData: GamePageResponse | undefined
) => {
  if (previousPageData && !previousPageData.data.length) return null;
  // first page, we don't have `previousPageData`
  console.log(pageIndex);
  if (pageIndex === 0) return `/games?pageSize=50`;
  // add the cursor to the API endpoint
  return `/games?after=${previousPageData?.nextCursor}&pageSize=50`;
};

const useGames = () => {
  const { data, size, setSize } = useSWRInfinite<GamePageResponse>(getKey, {
    revalidateFirstPage: false,
  });

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return { games: data, fetchNextPage };
};

export default useGames;
