import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";
import {
  RATING_KEY,
  PRICE_KEY,
  SORTING_ASCENDING,
  SORTING_DESCENDING,
  SORTING_CRITERIA_ID,
  SORTING_DIRECTION_ID,
} from "../utils/consts";

const SORTING_CRITERIA = [RATING_KEY, PRICE_KEY];
const SORTING_DIRECTIONS = [SORTING_ASCENDING, SORTING_DESCENDING];

export default function SortingPanel() {
  const { sorting, setSorting } = useContext(FilterContext);

  return (
    <div className="flex md:flex-row flex-col gap-2 bg-blue-950 text-amber-100 w-full p-2 m-1 rounded-sm">
      Sorting
      <select
        data-testid={`test-${SORTING_CRITERIA_ID}`}
        className="bg-blue-400 text-black"
        value={sorting[SORTING_CRITERIA_ID] || ""}
        name={SORTING_CRITERIA_ID}
        id={SORTING_CRITERIA_ID}
        onChange={(e) => {
          setSorting((prev) => ({
            ...prev,
            [SORTING_CRITERIA_ID]: e.target.value,
          }));
          window.localStorage.setItem(
            SORTING_CRITERIA_ID,
            JSON.stringify(e.target.value)
          );
        }}
      >
        <option value="" disabled>
          Select sorting criteria
        </option>
        {SORTING_CRITERIA.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        data-testid={`test-${SORTING_DIRECTION_ID}`}
        className="bg-blue-400 text-black"
        value={sorting[SORTING_DIRECTION_ID] || ""}
        name={SORTING_DIRECTION_ID}
        id={SORTING_DIRECTION_ID}
        onChange={(e) => {
          setSorting((prev) => ({
            ...prev,
            [SORTING_DIRECTION_ID]: e.target.value,
          }));
          window.localStorage.setItem(
            SORTING_DIRECTION_ID,
            JSON.stringify(e.target.value)
          );
        }}
      >
        <option value="" disabled>
          Select sorting direction
        </option>
        {SORTING_DIRECTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
