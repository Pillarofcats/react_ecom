import { useState, useEffect } from "react"

const mockProducts = [
  "shirt",
  "tv",
  "toy",
  "chips",
  "ring",
]


export default function PageHome() {

  const [products, setProducts] = useState<string[] | null>(null)

  useEffect(() => {
    setProducts(mockProducts)
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-3 justify-center items-center selected">
      {
        products?.map((product, index) => {
          return (
            <div key={ index }>
              <p>Product: { product }</p>
            </div>
          )
        })
      }
    </div>
  )
}