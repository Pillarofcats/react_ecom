import { BiSearch } from "react-icons/bi"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState, useMemo } from "react"
import { useAppSelector } from "../redux/hooks/default"
import NavLocalSearchProducts from "../components/NavLocalSearchProducts"

import useURLParams from "../hooks/useURLParams"

export default function NavItemSearch() {
  console.log("Render NavItemSearch")

  const navigate = useNavigate()
  const location = useLocation()

  const { products } = useAppSelector((state) => state.products)

  const [localSearch, setLocalSearch] = useState<string>("")

  const filteredProductsByLocalSearch = useMemo(() => products.filter((product) => product.title.toLowerCase().includes(localSearch.toLowerCase())).slice(0,5), [localSearch, products] )

  console.log("localSearch", localSearch)
  // const [searchParam, setSearchParam] = useSearchParams()

  const { currentType, queryParams } = useURLParams()

  const typeSelectRef = useRef<HTMLSelectElement>(null)
  const localSearchInputRef = useRef<HTMLInputElement>(null)

  function handleSearchFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (document.activeElement !== localSearchInputRef.current) return
    console.log("SEARCH SUBMIT", localSearch)
    // navigate(`/products?${queryParams.toString()}`)
  }

  function onProductTypeChange(e:React.ChangeEvent<HTMLSelectElement>) {
    queryParams.set("page", "1")
    queryParams.set("type", `${e.target.value}`)
    navigate(`/products?${queryParams.toString()}`)
    // return currentType
  }


  function onSearchChange(e:React.ChangeEvent<HTMLInputElement>) {
    console.log("Search", e.target.value)
    setLocalSearch(e.target.value)
  }

  // function onSearchChange(e:React.ChangeEvent<HTMLInputElement>) {
  //   console.log("Search", e.target.value)
  //   setSearchParam((prev) => {
  //     prev.set("search", `${e.target.value}`)
  //     return prev
  //   }, { replace: true })
  // }

  useEffect(() => {
    //Reset product type when navigating outside of /products or query params are default
    const typeParam = queryParams.get("type")

    if(typeSelectRef.current) {
      if(!typeParam) typeSelectRef.current.value = "all"
      else typeSelectRef.current.value = typeParam
    }
    
  }, [location, queryParams])

  return (
    <div  className="md:flex hidden h-8 self-center min-w-fit w-[50%]">
      <select
        ref={ typeSelectRef }
        className=" h-8 hover:cursor-pointer hover:bg-sky-400  rounded-l-md text-black"
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

      <form className="relative flex flex-1" onSubmit={ handleSearchFormSubmit }>

        <input
          ref={localSearchInputRef}
          onChange={ onSearchChange }
          className="w-full text-black h-8 indent-2 font-medium"
          value={ localSearch }
          type="text" name="search" id="search" placeholder={`Search.. `}
        />

        { localSearch ?
            <NavLocalSearchProducts filteredLocalSearchProducts={filteredProductsByLocalSearch} setLocalSearch={setLocalSearch} />
            :
            null
        }

        <button
          className="px-1 h-8 bg-sky-300 hover:cursor-pointer hover:bg-sky-400 rounded-r-md text-black"
          type="submit">
            <BiSearch size={25}/>
        </button>
      </form>
    </div>
  )
}
