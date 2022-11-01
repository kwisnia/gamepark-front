import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useDebouncedCallback } from "use-debounce";
import useUsers from "../../hooks/useUsers";
import { BasicUserDetails } from "../../types/user";

interface UserAutocompleteProps {
  onSelect: (user: BasicUserDetails) => void;
}

const UserAutocomplete = ({ onSelect }: UserAutocompleteProps) => {
  const { users, setSearch } = useUsers();
  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    500
  );

  const usersFlat = users?.flat() ?? [];

  return (
    <AutoComplete
      emptyState={
        <Text align="center" fontWeight="bold">
          No users found
        </Text>
      }
      onSelectOption={(option) => {
        onSelect(option.item.originalValue);
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
        {usersFlat.map((user) => (
          <AutoCompleteItem value={user} label={user.displayName} key={user.id}>
            <Flex>
              <Avatar src={user.avatar ?? ""} />
              <Text>
                {user.displayName} ({user.username})
              </Text>
            </Flex>
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};

export default UserAutocomplete;
