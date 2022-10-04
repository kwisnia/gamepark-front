import { Select } from "chakra-react-select";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

const gameOptions = [
  { value: 0, label: "Games" },
  { value: 1, label: "DLCs" },
  { value: 2, label: "Expansions" },
  { value: 8, label: "Remakes" },
  { value: 9, label: "Remasters" },
];

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "first_release_date", label: "Release Date" },
  { value: "aggregated_rating", label: "Critics rating" },
  { value: "rating", label: "Community rating" },
];

interface FilterSortWindowProps {
  filter: number[];
  setFilter: (value: number[]) => void;
  sort: string;
  setSort: (value: string) => void;
  order: "asc" | "desc";
  setOrder: (value: "asc" | "desc") => void;
}

const FilterSortWindow = ({
  filter,
  setFilter,
  sort,
  setSort,
  order,
  setOrder,
}: FilterSortWindowProps) => {
  const changeSortOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button bg={"gray.600"} display="flex" justifyContent={"flex-end"}>
          Filter options
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg={"gray.600"}
        border={"none"}
        className="bg-slate-600 p-2 rounded-md m-2 mr-10"
      >
        <Text>Game types</Text>
        <Select
          useBasicStyles
          colorScheme="red"
          closeMenuOnSelect={false}
          options={gameOptions}
          isMulti
          defaultValue={gameOptions.filter((option) =>
            filter.includes(option.value)
          )}
          onChange={(value) => setFilter(value.map((option) => option.value))}
        />
        <Text>Sort by</Text>
        <Flex>
          <Box flex={9}>
            <Select
              useBasicStyles
              options={sortOptions}
              defaultValue={sortOptions[0]}
              onChange={(option) => setSort(option!.value)}
            />
          </Box>
          <IconButton
            icon={order === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
            aria-label="Change sort direction"
            onClick={changeSortOrder}
          />
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default FilterSortWindow;
