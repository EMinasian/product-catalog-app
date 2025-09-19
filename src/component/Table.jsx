import { Suspense, useState, useTransition } from "react";
import { RingLoader } from "react-spinners";
import Product from "./Product";
import FilterBar from "./FilterBar";
import mockData from "../mock/data.json";
import { FilterProvider } from "../contexts/FilterContext";
import Pagination from "./Pagination";
import {
  BRAND_KEY,
  CATEGORY_KEY,
  RATING_KEY,
  PRICE_KEY,
  SORTING_CRITERIA_ID,
  SORTING_DIRECTION_ID,
  SORTING_ASCENDING,
  NAME_SEARCH_KEY,
} from "../utils/consts";

const DISCRETE_FILTERS = [BRAND_KEY, CATEGORY_KEY];
const RANGE_FILTERS = [RATING_KEY, PRICE_KEY];
const POST_PER_PAGE = 6;

const getInitialFilters = () =>
  [...DISCRETE_FILTERS, ...RANGE_FILTERS].reduce(
    (accumulator, currentKey) => {
      const value = window?.localStorage?.getItem(currentKey);
      return value
        ? { ...accumulator, [currentKey]: JSON.parse(value) }
        : accumulator;
    },
    { [RATING_KEY]: 0, [PRICE_KEY]: 0 }
  );

const getInitialSorting = () => {
  const criteria = window?.localStorage?.getItem(SORTING_CRITERIA_ID);
  const direction = window?.localStorage?.getItem(SORTING_DIRECTION_ID);
  if (criteria && direction) {
    return {
      [SORTING_CRITERIA_ID]: JSON.parse(criteria),
      [SORTING_DIRECTION_ID]: JSON.parse(direction),
    };
  }
  return {};
};

export default function Table() {
  const [filter, setFilter] = useState(getInitialFilters);
  const [sorting, setSorting] = useState(getInitialSorting);
  const [currentPage, setCurrentPage] = useState(1);

  const [pendingReset, startResetTransition] = useTransition();

  const filterData = () => {
    const discreteFilteredData = DISCRETE_FILTERS.reduce(
      (accumulator, current) => {
        if (filter[current]) {
          return accumulator.filter(
            (item) => item[current] === filter[current]
          );
        }
        return accumulator;
      },
      mockData
    );

    const rangeFilteredData = RANGE_FILTERS.reduce((accumulator, current) => {
      if (filter[current]) {
        return accumulator.filter((item) => item[current] >= filter[current]);
      }
      return accumulator;
    }, discreteFilteredData);

    const searchedData = rangeFilteredData.filter(
      (item) =>
        !filter[NAME_SEARCH_KEY] ||
        item[NAME_SEARCH_KEY].toLowerCase().includes(
          filter[NAME_SEARCH_KEY].toLowerCase()
        )
    );

    return searchedData;
  };

  const filteredData = filterData();

  const sortData = () => {
    if (!sorting[SORTING_CRITERIA_ID] || !sorting[SORTING_DIRECTION_ID]) {
      return filteredData;
    }
    return filteredData.sort(
      (a, b) =>
        (a[sorting[SORTING_CRITERIA_ID]] - b[sorting[SORTING_CRITERIA_ID]]) *
        (sorting[SORTING_DIRECTION_ID] === SORTING_ASCENDING ? 1 : -1)
    );
  };

  const sortedData = sortData();

  const paginatedData = sortedData.slice(
    (currentPage - 1) * POST_PER_PAGE,
    currentPage * POST_PER_PAGE
  );

  const handleReset = () => {
    startResetTransition(async () => {
      // artificaial delay for loading purposes
      await new Promise((r) => setTimeout(r, 2000));
      setSorting({});
      setFilter({});
      setCurrentPage(1);
      window?.localStorage?.clear();
    });
  };

  return (
    <Suspense fallback={<span>Loading</span>}>
      <div className="flex flex-col md:flex-row items-center sizes-full bg-blue-950 md:px-12 h-full">
        <FilterProvider
          value={{
            filter,
            setFilter,
            sorting,
            setSorting,
            handleReset,
            setCurrentPage,
          }}
        >
          <FilterBar />
        </FilterProvider>
        <div className="flex flex-col items-center bg-blue-400 md:size-full size-screen pb-8">
          <div className="grid md:grid-cols-3 grid-cols-1  p-4 md:p-8 gap-8">
            {pendingReset ? (
              <RingLoader loading size={250} />
            ) : paginatedData.length === 0 ? (
              <span>No products found!</span>
            ) : (
              paginatedData.map(
                ({ name, category, brand, price, rating, imageUrl, id }) => (
                  <Product
                    key={id}
                    name={name}
                    category={category}
                    brand={brand}
                    price={price}
                    rating={rating}
                    imageUrl={imageUrl}
                  />
                )
              )
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalNumberOfPages={Math.ceil(sortedData.length / POST_PER_PAGE)}
          />
        </div>
      </div>
    </Suspense>
  );
}
