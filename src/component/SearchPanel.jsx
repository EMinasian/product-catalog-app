import { useRef, useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";
import { NAME_SEARCH_KEY } from "../utils/consts";

export default function SearchPanel() {
  const searchInput = useRef("");
  const { setFilter } = useContext(FilterContext);

  return (
    <div className="flex bg-blue-950 text-amber-100 rounded-sm p-1 w-full m-1 justify-between">
      <label for={NAME_SEARCH_KEY}>Search product name:</label>
      <input
        className="bg-blue-400 mx-1 h-12"
        ref={searchInput}
        type="text"
        name={NAME_SEARCH_KEY}
      />
      <button
        className="bg-green-600 px-2 py-1 text-black rounded-sm"
        onClick={() => {
          setFilter((prev) => ({
            ...prev,
            [NAME_SEARCH_KEY]: searchInput.current.value,
          }));
        }}
      >
        Search
      </button>
    </div>
  );
}
