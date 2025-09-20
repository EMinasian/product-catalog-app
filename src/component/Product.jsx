export default function Product({
  name,
  category,
  brand,
  price,
  rating,
  imageUrl,
}) {
  return (
    <div className="bg-amber-100 rounded-2xl">
      <img className="rounded-t-2xl" src={imageUrl} alt={name} />
      <div className="grid grid-cols-2 p-2">
        <div>
          <h2>{name}</h2>
          <span>{brand}</span>
        </div>
        <div className="flex flex-col">
          <span>{category}</span>
          <span data-testid="rating">{rating}</span>
          <span data-testid="price">{price}</span>
        </div>
      </div>
    </div>
  );
}
