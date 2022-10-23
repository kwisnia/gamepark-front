import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Skeleton, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useGames from "../hooks/useGames";

const GameAutocomplete = () => {
  const { games, setSearch } = useGames(5);
  const router = useRouter();

  const gamesFlat = useMemo(() => games?.flat() ?? [], [games]);

  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    500
  );

  return (
    <AutoComplete
      emptyState={
        <Text align="center" fontWeight="bold">
          No games found
        </Text>
      }
      onSelectOption={(option) => {
        router.push(`/games/${option.item.value}`);
      }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <AutoCompleteInput
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </InputGroup>
      <AutoCompleteList>
        {gamesFlat.map((game) => (
          <Link href={`/games/${game.slug}`} key={game.slug}>
            <AutoCompleteItem value={game.slug} label={game.name}>
              {game.name}
            </AutoCompleteItem>
          </Link>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};

export default GameAutocomplete;
