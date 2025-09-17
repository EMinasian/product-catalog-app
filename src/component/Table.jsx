import Product from "./Product";
import mockData from "../mock/data.json"

export default function Table () {
  return (
    <div className="flex justify-center sizes-full bg-blue-950">
      <div className="grid md:grid-cols-3 grid-cols-1 w-[90%] md:w-[70%] bg-blue-400 p-4 md:p-8 gap-8">
        {mockData.map(({ name, category, brand, price, rating, imageUrl }) => 
          <Product name={name} category={category} brand={brand} price={price} rating={rating} imageUrl={imageUrl}/>)}
      </div>
    </div>

  )
}