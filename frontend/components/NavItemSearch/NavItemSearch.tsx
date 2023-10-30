import { useEffect, useState, useMemo } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/hooks/default"
import { getProducts } from "../../redux/slices/productsSlice"
import { tType } from "../../types/types"

import NavItemSearchTypeSelect from "./NavItemSearchTypeSelect"
import NavItemSearchForm from "./NavItemSearchForm"

import useURLParams from "../../hooks/useURLParams"

export default function NavItemSearch() {
  console.log("Render NavItemSearch")
  const dispatch = useAppDispatch()
  const { currentType, queryParams } = useURLParams()
  const { products } = useAppSelector((state) => state.products)

  console.log("products in navitemsearch", products)

  const [localSearch, setLocalSearch] = useState<string>("")
  const [toggleLocalSearch, setToggleLocalSearch] = useState<boolean>(false)

  // const [toggleSearchByStars, setToggleSearchByStars] = useState(false)
  // const [toggleSearchByPrice, setToggleSearchByPrice] = useState(false)


  const filteredProductsByLocalSearch = useMemo(() => {
    // if(!products) return [] as tProduct[]
    return products.filter((product) => product.title.toLowerCase().includes(localSearch.toLowerCase())).slice(0,5)
  }, [localSearch, products])

  useEffect(() => {
    if(!currentType) return
    dispatch(getProducts(currentType as tType))
  }, [currentType, dispatch])

  return (
    <div  className="md:flex hidden h-8 self-center min-w-fit w-[50%]">
      <NavItemSearchTypeSelect
        currentType={currentType}
        queryParams={queryParams}/>

      <NavItemSearchForm 
        localSearch={localSearch}
        setLocalSearch={setLocalSearch}
        toggleLocalSearch={toggleLocalSearch}
        setToggleLocalSearch={setToggleLocalSearch}
        filteredProductsByLocalSearch={filteredProductsByLocalSearch}/>
    </div>
  )
}
