import Filter from "./Filter"
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
  return (
    <div className="flex h-12 w-full bg-amber-600 px-10">
      {
        FILTER_VALUES.map(({ id, title, options }) => <Filter filter={filter} setFilter={setFilter} id={id} title={title} options={options} />)
      }
    </div>
  )
}