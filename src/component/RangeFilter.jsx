import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

export default function RangeFilter({ id, title, min, max }) {
  const { filter, setFilter } = useContext(FilterContext);

  return (
    <div className="flex gap-2 bg-blue-950 text-amber-100 w-full p-2 m-1 rounded-sm">
      <label className="w-full" for={id}>{`${title} :`}</label>
      <input
        className="w-full"
        type="range"
        name={id}
        min={min}
        max={max}
        id={id}
        onChange={(e) => {
          setFilter((prev) => ({ ...prev, [id]: e.target.value }));
        }}
        value={filter[id]}
      ></input>
      <span>{filter[id]}</span>
    </div>
  );
}
