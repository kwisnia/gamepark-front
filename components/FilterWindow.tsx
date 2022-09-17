import { useState } from "react";
import Select from "react-select";

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
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  return (
    <div className="flex justify-end w-full relative mr-10">
      <button
        className="bg-slate-600 text-white p-2 rounded-md m-2 mr-10"
        onClick={() => setFilterMenuOpen((prev) => !prev)}
      >
        Filter options
      </button>
      {filterMenuOpen && (
        <div className="bg-slate-600 p-2 rounded-md m-2 absolute top-10 mr-10 z-10">
          <p className="text-white">Game types</p>
          <Select
            closeMenuOnSelect={false}
            options={gameOptions}
            isMulti
            defaultValue={gameOptions.filter((option) =>
              filter.includes(option.value)
            )}
            onChange={(value) => setFilter(value.map((option) => option.value))}
          />
          <p className="text-white">Sort by</p>
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            onChange={(option) => setSort(option!.value)}
          />
        </div>
      )}
    </div>
  );
};

export default FilterSortWindow;
