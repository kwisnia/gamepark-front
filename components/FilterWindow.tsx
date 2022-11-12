import { Select } from "chakra-react-select";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { BsFilter } from "react-icons/bs";

const gameOptions = [
  { value: 0, label: "Games" },
  { value: 1, label: "DLCs" },
  { value: 2, label: "Expansions" },
  { value: 8, label: "Remakes" },
  { value: 9, label: "Remasters" },
];

const sortOptions = [
  { value: "aggregated_rating", label: "Critics rating" },
  { value: "rating", label: "Community rating" },
  { value: "name", label: "Name" },
  { value: "first_release_date", label: "Release Date" },
];

enum SortDirection {
  Ascending = "asc",
  Descending = "desc",
}

interface FilterSortWindowProps {
  filter: number[];
  setFilter: (value: number[]) => void;
  sort: string;
  setSort: (value: string) => void;
  order: SortDirection;
  setOrder: (value: SortDirection) => void;
}

const FilterSortWindow = ({
  setFilter,
  setSort,
  order,
  setOrder,
}: FilterSortWindowProps) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const changeSortOrder = () => {
    if (order === "asc") {
      setOrder(SortDirection.Descending);
    } else {
      setOrder(SortDirection.Ascending);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        {isMobile ? (
          <IconButton
            display={{
              base: "flex",
              md: "none",
            }}
            aria-label="Open menu"
            fontSize="20px"
            variant={"ghost"}
            icon={<Icon as={BsFilter} />}
          />
        ) : (
          <Button
            bg="gray.600"
            display={{
              base: "none",
              md: "flex",
            }}
            justifyContent="flex-end"
          >
            Filter options
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent bg="gray.600" border="none" className="p-5 rounded-md">
        <Text>Game types</Text>
        <Select
          useBasicStyles
          colorScheme="red"
          closeMenuOnSelect={false}
          options={gameOptions}
          isMulti
          defaultValue={gameOptions}
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
