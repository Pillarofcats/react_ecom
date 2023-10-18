export default function ProductPrice({ price }: { price: number}) {
  return <p>{ `$ ${ (price * .01).toFixed(2) }` }</p>
}