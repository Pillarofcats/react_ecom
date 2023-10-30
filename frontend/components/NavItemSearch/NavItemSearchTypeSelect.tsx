import { useNavigate, useLocation } from "react-router-dom"
import { useRef, useEffect } from "react"

export default function NavItemSearchTypeSelect({currentType, queryParams}: {currentType:string, queryParams:URLSearchParams}) {

  const navigate = useNavigate()
  const location = useLocation()

  const typeSelectRef = useRef<HTMLSelectElement>(null)

  function onProductTypeChange(e:React.ChangeEvent<HTMLSelectElement>) {
    queryParams.set("page", "1")
    queryParams.set("type", `${e.target.value}`)
    navigate(`/products?${queryParams.toString()}`)
  }

  useEffect(() => {
    //Reset product type when navigating outside of /products or query params are default
    const typeParam = queryParams.get("type")

    if(typeSelectRef.current) {
      if(!typeParam) typeSelectRef.current.value = "all"
      else typeSelectRef.current.value = typeParam
    }
  }, [location, queryParams])

  return (
    <div>
      
      <select
        ref={ typeSelectRef }
        className="h-8 hover:cursor-pointer hover:bg-sky-400  rounded-l-md text-black"
        defaultValue={ currentType }
        onChange={ onProductTypeChange }>
          <option value="all">All</option>
          <option value="apparel">Apparel</option>
          <option value="cookware">Cookware</option>
          <option value="cosmetics">Cosmetics</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="foods">Foods</option>
          <option value="instruments">Instruments</option>
          <option value="jewelry">Jewelry</option>
          <option value="tools">Tools</option>
          <option value="toys">Toys</option>
      </select>

      <select className="h-8 hover:cursor-pointer hover:bg-sky-400 text-black border-l border-[#292F36]"  name="bystars" >
        <option value="maxstars">Max Stars</option>
      </select>

      <select className="h-8 hover:cursor-pointer hover:bg-sky-400 text-black border-l border-[#292F36]" name="byprice">
        <option value="minprice">Min Price</option>
      </select>

    </div>
  )
}