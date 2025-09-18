import { useState } from "react"
import DiscreteFilter from "./DiscreteFilter"
import { BRAND_KEY, CATEGORY_KEY } from "../utils/consts"

const FILTER_VALUES = [
  {
    id: BRAND_KEY, title: 'Brand', options: ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E']
  },
  {
    id: CATEGORY_KEY, title: 'Category', options: ['Electronics', 'Footwear', 'Clothing']
  }
]

export default function FilterBar ({ filter, setFilter }) {

  const [openMobileFilter, setOpenMobileFilter] = useState(false)

  return (
    <div className="h-12 w-full bg-amber-600 px-10">
      <div className="hidden md:flex">
        {
          FILTER_VALUES.map(({ id, title, options }) => <DiscreteFilter filter={filter} setFilter={setFilter} id={id} title={title} options={options} />)
        }
      </div>
      <button className="md:hidden bg-blue-950 text-amber-50 p-2 m-1 rounded-sm" onClick={() => setOpenMobileFilter(true)}>Filters</button>
      {
        openMobileFilter && (
          <div className="fixed top-0 left-0 flex flex-col bg-amber-600 w-[80%] gap-2 px-2 py-6">
            {
              FILTER_VALUES.map(({ id, title, options }) => <DiscreteFilter filter={filter} setFilter={setFilter} id={id} title={title} options={options} />)
            }
            <button onClick={() => setOpenMobileFilter(false)}>close</button>
          </div>
        )
      }

    </div>

  )
}