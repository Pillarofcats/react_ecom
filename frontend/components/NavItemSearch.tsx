import { BiSearch } from "react-icons/bi"
import { useNavigate, useLocation} from "react-router-dom"
import { useEffect, useRef } from "react"

import useURLParams from "../hooks/useURLParams"

export default function NavItemSearch() {
  console.log("Render NavItemSearch")

  const navigate = useNavigate()
  const location = useLocation()
  const { currentType, queryParams } = useURLParams()
  const typeSelectRef = useRef<HTMLSelectElement>(null)

  function handleFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("searching for...")
  }

  function onProductTypeChange(e:React.ChangeEvent<HTMLSelectElement>) {
    queryParams.set("page", "1")
    queryParams.set("type", `${e.target.value}`)
    navigate(`/products?${queryParams.toString()}`);
    return currentType
  }

  useEffect(() => {
    //Reset product type when navigating outside of /products or query params are default
    if(location.pathname !== "/products" || location.search === "?page=1&type=all") {
      if(typeSelectRef.current) typeSelectRef.current.value = "all"
    }
  }, [location])

  return (
    <div  className="flex h-8 self-center w-[50%]">
      <select
        ref={ typeSelectRef }
        className="bg-orange-300 h-8 hover:cursor-pointer hover:bg-orange-400 rounded-l-md text-black"
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

      <form className="flex flex-1" onSubmit={ handleFormSubmit }>
        <input
          className="w-full text-black h-8 indent-2 font-medium"
          type="text" name="search" id="search" placeholder={`Search.. `}
        />

        <button
          className="px-1 bg-orange-300 h-8 hover:cursor-pointer hover:bg-orange-400 rounded-r-md text-black"
          type="submit"
          onClick={() => console.log("Searching")} >
            <BiSearch size={25}/>
        </button>
      </form>
    </div>
  )
}
