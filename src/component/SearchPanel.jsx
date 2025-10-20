import { useRef, useContext, useCallback } from "react";
import { FilterContext } from "../contexts/FilterContext";
import { NAME_SEARCH_KEY } from "../utils/consts";

export default function SearchPanel() {
  const searchInput = useRef(null);
  const timeoutId = useRef(null);

  const { setFilter, setIsLoading } = useContext(FilterContext);

  const handleSearch = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    setIsLoading(true);

    timeoutId.current = setTimeout(() => {
      setFilter((prev) => ({
        ...prev,
        [NAME_SEARCH_KEY]: searchInput.current?.value || "",
      }));
      setIsLoading(false);
    }, 2000);
  }, [setFilter, setIsLoading]);

  return (
    <div className="flex flex-col md:flex-row bg-blue-950 text-amber-100 rounded-sm p-1 w-full m-1 justify-between gap-1">
      <label htmlFor={NAME_SEARCH_KEY}>Search product name:</label>
      <input
        data-testid="search-input"
        className="bg-blue-400 min-h-12 size-full"
        ref={searchInput}
        type="text"
        name={NAME_SEARCH_KEY}
      />
      <button
        className="bg-green-600 px-2 py-1 text-black rounded-sm max-w-36"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
