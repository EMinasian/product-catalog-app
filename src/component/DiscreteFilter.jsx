import { useContext } from "react"
import { FilterContext } from "../contexts/FilterContext"

export default function Filter ({ id, title, options }) {

  const { filter, setFilter } = useContext(FilterContext)
  return (
    <div className="flex gap-2 bg-blue-950 text-amber-100 w-fit p-2 m-1 rounded-sm">
      <select className="bg-blue-400 text-black" value={filter[id] || ""} name={id} id={id} onChange={(e) => { setFilter(prev => ({ ...prev, [id]: e.target.value }))}}>
        <option value="" disabled>
          Select {title.toLowerCase()}
        </option>
        {
          options.map(option => <option value={option}>{option}</option>)
        }
      </select>
    </div>
  )
}