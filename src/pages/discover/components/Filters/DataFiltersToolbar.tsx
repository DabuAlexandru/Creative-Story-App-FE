import { Cross2Icon } from "@radix-ui/react-icons"
import { DataFilterField } from "./DataFilterField"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StoryFilterType } from "@/utils/types/story.types"
import { filtersHaveValue } from "../../utils"
import { StateSetter } from "@/utils/types/general.types"

export const DataFiltersToolbar = ({
  filters,
  setFilters,
  genreOptions,
  authorOptions
}: {
  filters: StoryFilterType;
  setFilters: StateSetter<StoryFilterType>;
  genreOptions: { value: string | number; label: string }[];
  authorOptions: { value: string | number; label: string }[];
}) => {
  const isFiltered = filtersHaveValue(filters)

  return (
    <div className="flex items-center justify-between px-8 pb-10">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter stories..."
          value={filters.title || ''}
          onChange={(event) => setFilters((oldFilters) => ({ ...oldFilters, title: event.target.value }))}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataFilterField
          selectedValues={filters.genreIds || []}
          setSelectedValues={(newValues) => setFilters((oldFilters) => ({ ...oldFilters, genreIds: newValues }))}
          title="Genre"
          options={genreOptions}
        />
        <DataFilterField
          selectedValues={filters.authorIds || []}
          setSelectedValues={(newValues) => setFilters((oldFilters) => ({ ...oldFilters, authorIds: newValues }))}
          title="Author"
          options={authorOptions}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => setFilters({})}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4 mt-[2.5px]" />
          </Button>
        )}
      </div>
    </div>
  )
}