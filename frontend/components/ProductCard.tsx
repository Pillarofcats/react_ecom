type tProduct = {
  p_id: string,
  title: string,
  description: string,
  price_cent: number,
  weight_lbs: number,
  product_type: string,
  quantity: number,
  quantity_sold?: number | null,
  stars: number
}

export default function ProductCard({ product }:{ product:tProduct }) {

  const stars = Array.from({ length: product.stars }, (_, ind) => ind+1)
  const price = Number(product.price_cent * .01).toFixed(2)

  return (
    <div className="flex flex-col gap-1">
      <p>Title: { product.title }</p>
      <img className="h-auto w-[15rem]" src={ `/products/${product.p_id}.jpg` } alt={ product.title } />
      <p className="w-[15rem]">{ `${product.description}..` }</p>
      <p>{ `Type: ${ product.product_type}` }</p>
      <p>{ `Lbs: ${ product.weight_lbs}` }</p>
      <p>{ `Qty: ${ product.quantity}` }</p>
      <div className="flex">{ stars.map((_, ind) => <p key={ind}>*</p>) }</div>
      <p>{ `$ ${ price }` }</p>
    </div>
  )
}
