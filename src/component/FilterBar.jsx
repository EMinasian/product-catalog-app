import { useState } from "react"
import DiscreteFilter from "./DiscreteFilter"
import RangeFilter from "./RangeFilter"
import { BRAND_KEY, CATEGORY_KEY, RATING_KEY, PRICE_KEY } from "../utils/consts"

const DISCRETE_FILTER_VALUES = [
  {
    id: BRAND_KEY, title: 'Brand', options: ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E']
  },
  {
    id: CATEGORY_KEY, title: 'Category', options: ['Electronics', 'Footwear', 'Clothing']
  }
]

const RANGE_FILTER_VALUES = [
  {
    id: RATING_KEY, title: 'Minimum Rating', min: 0, max: 5
  },
  {
    id: PRICE_KEY, title: 'Minimum Price', min: 0, max: 500
  }
]

export default function FilterBar ({ filter, setFilter }) {

  const [openMobileFilter, setOpenMobileFilter] = useState(false)

  return (
    <div className="h-12 w-full bg-amber-600 px-10">
      <div className="hidden md:flex">
        {
          DISCRETE_FILTER_VALUES.map(({ id, title, options }) => <DiscreteFilter filter={filter} setFilter={setFilter} id={id} title={title} options={options} />)
        }
        {
          RANGE_FILTER_VALUES.map(({ id, title, max, min }) => <RangeFilter filter={filter} setFilter={setFilter} id={id} title={title} max={max} min={min} />)
        }
      </div>
      <button className="md:hidden bg-blue-950 text-amber-50 p-2 m-1 rounded-sm" onClick={() => setOpenMobileFilter(true)}>Filters</button>
      {
        openMobileFilter && (
          <div className="fixed top-0 left-0 flex flex-col bg-amber-600 w-[80%] gap-2 px-2 py-6">
            {
              DISCRETE_FILTER_VALUES.map(({ id, title, options }) => <DiscreteFilter filter={filter} setFilter={setFilter} id={id} title={title} options={options} />)
            }
            {
              RANGE_FILTER_VALUES.map(({ id, title, max, min }) => <RangeFilter filter={filter} setFilter={setFilter} id={id} title={title} max={max} min={min} />)
            }
            <button onClick={() => setOpenMobileFilter(false)}>close</button>
          </div>
        )
      }

    </div>

  )
}