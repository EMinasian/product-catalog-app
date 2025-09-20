import { useCallback, useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

export default function Filter({ id, title, options }) {
  const { filter, setFilter, setCurrentPage } = useContext(FilterContext);

  const onChange = useCallback((e) => {
    setFilter((prev) => ({ ...prev, [id]: e.target.value }));
    window.localStorage.setItem(id, JSON.stringify(e.target.value));
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex gap-2 bg-blue-950 text-amber-100 w-full p-2 m-1 rounded-sm">
      <select
        data-testid={`${id}-filter`}
        className="bg-blue-400 text-black w-full"
        value={filter[id] || ""}
        name={id}
        id={id}
        onChange={onChange}
      >
        <option value="" disabled>
          Select {title.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
