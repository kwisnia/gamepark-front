import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
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
          <AutoCompleteItem value={game.slug} label={game.name} key={game.slug}>
            <Link href={`/games/${game.slug}`}>{game.name}</Link>
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};

export default GameAutocomplete;
