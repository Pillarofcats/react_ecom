import { useEffect, useState, useMemo } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/hooks/default"
import { getProducts } from "../../redux/slices/productsSlice"
import { tType } from "../../types/types"
import { shallowEqual } from "react-redux"

import useURLParams from "../../hooks/useURLParams"
import { useSearchParams } from "react-router-dom"

import NavItemSearchTypeSelect from "./NavItemSearchTypeSelect"
import NavItemSearchForm from "./NavItemSearchForm"

export default function NavItemSearch() {
  console.log("NAVBAR")

  const { currentSearch, currentType, queryParams } = useURLParams()
  const { products } = useAppSelector((state) => state.products, shallowEqual)
  
  const [localSearch, setLocalSearch] = useSearchParams({"search":currentSearch})
  const [toggleLocalSearch, setToggleLocalSearch] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const search = localSearch.get("search") || ""

  const filteredProductsByLocalSearch = useMemo(() => {
    return products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())).slice(0,5)
  }, [search, products])

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
