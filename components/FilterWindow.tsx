import { Select } from "chakra-react-select";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";

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
}

const FilterSortWindow = ({
  filter,
  setFilter,
  sort,
  setSort,
}: FilterSortWindowProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          bg={"gray.600"}
          display="flex"
          justifyContent={"flex-end"}
          className="text-white"
        >
          Filter options
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg={"gray.600"}
        border={"none"}
        className="bg-slate-600 p-2 rounded-md m-2 mr-10"
      >
        <Text className="text-white">Game types</Text>
        <Select
          closeMenuOnSelect={false}
          options={gameOptions}
          isMulti
          defaultValue={gameOptions.filter((option) =>
            filter.includes(option.value)
          )}
          onChange={(value) => setFilter(value.map((option) => option.value))}
        />
        <Text className="text-white">Sort by</Text>
        <Select
          options={sortOptions}
          defaultValue={sortOptions[0]}
          onChange={(option) => setSort(option!.value)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default FilterSortWindow;
