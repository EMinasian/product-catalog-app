import { useState } from "react";
import Product from "./Product";
import FilterBar from "./FilterBar";
import mockData from "../mock/data.json"
import { BRAND_KEY, CATEGORY_KEY } from "../utils/consts";

const DISCRETE_FILTERS = [ BRAND_KEY, CATEGORY_KEY ]

export default function Table () {
  const [filter, setFilter] = useState({})

  const filterData = () => {
    return DISCRETE_FILTERS.reduce((accumulator, current) => {
      if (filter[current]) {
        return accumulator.filter(item => item[current] === filter[current])
      }
      return accumulator
    }, mockData)
  }

  const filteredData = filterData()

  return (
    <div className="flex flex-col items-center sizes-full bg-blue-950">
      <FilterBar filter={filter} setFilter={setFilter} />
      <div className="grid md:grid-cols-3 grid-cols-1 w-[90%] md:w-[70%] bg-blue-400 p-4 md:p-8 gap-8">
        {filteredData.map(({ name, category, brand, price, rating, imageUrl }) => 
          <Product name={name} category={category} brand={brand} price={price} rating={rating} imageUrl={imageUrl}/>)}
      </div>
    </div>

  )
}