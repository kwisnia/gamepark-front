import { GameList } from "../types/lists";
import useSWRImmutable from "swr/immutable";
import useLoggedInUser from "./useLoggedInUser";
import { useEffect } from "react";

interface UserGameInfo {
  lists: GameList[];
}

const useUserGameInfo = (game: string) => {
  const { user, loggedOut } = useLoggedInUser();
  const { data, mutate, isValidating } = useSWRImmutable<UserGameInfo>(
    `/games/${game}/user`
  );

  useEffect(() => {
    if (user && !loggedOut) {
      mutate();
    }
  }, [user, loggedOut, mutate]);

  return {
    lists: data?.lists,
    mutate,
    loading: !data || isValidating,
  };
};

export default useUserGameInfo;
