import { useState, useContext, useCallback } from "react";
import DiscreteFilter from "./DiscreteFilter";
import RangeFilter from "./RangeFilter";
import SortingPanel from "./SortingPanel";
import SearchPanel from "./SearchPanel";
import { FilterContext } from "../contexts/FilterContext";
import {
  BRAND_KEY,
  CATEGORY_KEY,
  RATING_KEY,
  PRICE_KEY,
} from "../utils/consts";

const DISCRETE_FILTER_VALUES = [
  {
    id: BRAND_KEY,
    title: "Brand",
    options: ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"],
  },
  {
    id: CATEGORY_KEY,
    title: "Category",
    options: ["Electronics", "Footwear", "Clothing"],
  },
];

const RANGE_FILTER_VALUES = [
  {
    id: RATING_KEY,
    title: "Minimum Rating",
    min: 0,
    max: 5,
  },
  {
    id: PRICE_KEY,
    title: "Minimum Price",
    min: 0,
    max: 500,
  },
];

export default function FilterBar() {
  const [openMobileFilter, setOpenMobileFilter] = useState(false);

  const { startResetTransition, setSorting, setFilter, setCurrentPage } =
    useContext(FilterContext);

  const handleReset = useCallback(() => {
    startResetTransition(async () => {
      // artificaial delay for loading purposes
      await new Promise((r) => setTimeout(r, 2000));
      setSorting({});
      setFilter({});
      setCurrentPage(1);
      window?.localStorage?.clear();
    });
  }, []);

  return (
    <div
      className="h-12 md:h-full w-full md:w-[40%] bg-amber-600 md:p-10"
      data-testid="filter-bar"
    >
      <div className="hidden md:flex flex-col">
        <SearchPanel />
        {DISCRETE_FILTER_VALUES.map(({ id, title, options }) => (
          <DiscreteFilter key={id} id={id} title={title} options={options} />
        ))}
        {RANGE_FILTER_VALUES.map(({ id, title, max, min }) => (
          <RangeFilter key={id} id={id} title={title} max={max} min={min} />
        ))}
        <SortingPanel />
        <button
          className="p-2 m-1 text-amber-50 rounded-sm bg-red-600 w-full"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <button
        className="md:hidden bg-blue-950 text-amber-50 p-2 m-1 rounded-sm"
        onClick={() => setOpenMobileFilter(true)}
      >
        Filters
      </button>
      {openMobileFilter && (
        <div className="fixed top-0 left-0 flex flex-col bg-amber-600 w-[80%] gap-2 px-2 py-6">
          <SearchPanel />
          {DISCRETE_FILTER_VALUES.map(({ id, title, options }) => (
            <DiscreteFilter key={id} id={id} title={title} options={options} />
          ))}
          {RANGE_FILTER_VALUES.map(({ id, title, max, min }) => (
            <RangeFilter key={id} id={id} title={title} max={max} min={min} />
          ))}
          <SortingPanel />
          <button onClick={() => setOpenMobileFilter(false)}>close</button>
        </div>
      )}
    </div>
  );
}
