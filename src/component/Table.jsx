import { Suspense, useState, useTransition } from "react";
import Product from "./Product";
import FilterBar from "./FilterBar";
import mockData from "../mock/data.json";
import { FilterProvider } from "../contexts/FilterContext";
import {
  BRAND_KEY,
  CATEGORY_KEY,
  RATING_KEY,
  PRICE_KEY,
  SORTING_CRITERIA_ID,
  SORTING_DIRECTION_ID,
  SORTING_ASCENDING,
} from "../utils/consts";

const DISCRETE_FILTERS = [BRAND_KEY, CATEGORY_KEY];
const RANGE_FILTERS = [RATING_KEY, PRICE_KEY];

export default function Table() {
  const [filter, setFilter] = useState({ [RATING_KEY]: 0, [PRICE_KEY]: 0 });
  const [sorting, setSorting] = useState({});

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

    return rangeFilteredData;
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

  const handleReset = () => {
    startResetTransition(async () => {
      // artificaial delay for loading purposes
      await new Promise((r) => setTimeout(r, 2000));
      setSorting({});
      setFilter({});
    });
  };

  return (
    <Suspense fallback={<span>Loading</span>}>
      <div className="flex flex-col items-center sizes-full bg-blue-950">
        <FilterProvider
          value={{ filter, setFilter, sorting, setSorting, handleReset }}
        >
          <FilterBar />
        </FilterProvider>
        <div className="grid md:grid-cols-3 grid-cols-1 w-[90%] md:w-[70%] bg-blue-400 p-4 md:p-8 gap-8">
          {pendingReset ? (
            <span>Loading!</span>
          ) : sortedData.length === 0 ? (
            <span>No products found!</span>
          ) : (
            sortedData.map(
              ({ name, category, brand, price, rating, imageUrl }) => (
                <Product
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
      </div>
    </Suspense>
  );
}
