// import ProductCard from "../components/ProductCard"
// import { useParams } from "react-router-dom"

// type tProduct = {
//   p_id: string,
//   title: string,
//   desc: string,
//   price_cent: number,
//   weight_lbs: number,
//   product_type: string,
//   quantity: number,
//   quantity_sold?: number | null,
//   stars: number
// }

export default function PageProduct() {

  // const { p_id } = useParams()
  //PULL PRODUCT DATA FROM REDUX TOOLKIT LIBRARY WITH p_id
  // const product = "prod"

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      {/* <ProductCard product={ product } /> */}
      <button className="productButton" onClick={() => console.log("Adding to cart:")}>Buy</button>
    </div>
  )
}
