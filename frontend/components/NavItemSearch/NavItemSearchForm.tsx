import { useEffect, useRef } from "react"
import { tProduct } from "../../types/types"
import { BiSearch } from "react-icons/bi"

import NavItemLocalSearchProducts from "./NavItemLocalSearchProducts"
import { SetURLSearchParams } from "react-router-dom"

export default function NavItemSearchForm(
  { 
    localSearch,
    setLocalSearch,
    toggleLocalSearch,
    setToggleLocalSearch,
    filteredProductsByLocalSearch
  }:{ 
    localSearch:URLSearchParams,
    setLocalSearch:SetURLSearchParams,
    toggleLocalSearch:boolean,
    setToggleLocalSearch:React.Dispatch<React.SetStateAction<boolean>>,
    filteredProductsByLocalSearch:tProduct[] 
  }) {

  const search = localSearch.get("search") || ""
  console.log("search:", search)

  const localSearchInputRef = useRef<HTMLInputElement>(null)
  const formSearchRef = useRef<HTMLFormElement>(null)
  const formSearchTimerRef = useRef<NodeJS.Timeout | null>(null)

  function handleSearchFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (document.activeElement !== localSearchInputRef.current) return
    if(filteredProductsByLocalSearch.length < 1) return
  }

  function onSearchChange(e:React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch((prev => {
      prev.set("search", `${e.target.value}`)
      return prev
    }))
  }

  function onMouseLeaveSearchBar(e:React.MouseEvent<HTMLFormElement, MouseEvent>) {
    if(search.length < 1) return
    e.preventDefault()

    formSearchTimerRef.current = setTimeout(() => {
      setToggleLocalSearch(false)
    }, 500)
  }

  function onMouseEnterSearchBar(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    if(search.length < 1) return
    e.preventDefault()

    if(localSearch) setToggleLocalSearch(true)
    clearTimeout(formSearchTimerRef.current as NodeJS.Timeout)
  }

  useEffect(() => {
    console.log("searchLength",search, search.length)
    if(search.length > 0) {
      setToggleLocalSearch(true)
    } else {
      setToggleLocalSearch(false)
    }
  }, [search, setToggleLocalSearch])

  useEffect(() => {
    return () => {
      clearTimeout(formSearchTimerRef.current as NodeJS.Timeout)
    }
  }, [])

  return (
    <form className="relative flex flex-1" ref={ formSearchRef } onSubmit={ handleSearchFormSubmit } onMouseEnter={ onMouseEnterSearchBar } onMouseLeave={ onMouseLeaveSearchBar }>

      <input
        ref={localSearchInputRef}
        onChange={ onSearchChange }
        className="w-full text-black h-8 indent-2 font-medium"
        value={ search }
        type="text" name="search" id="search" placeholder={`Search.. `}
      />

      { toggleLocalSearch ?
          <NavItemLocalSearchProducts 
            filteredLocalSearchProducts={filteredProductsByLocalSearch}
            />
          :
          null
      }

      <button
        className="px-1 h-8 bg-sky-300 hover:cursor-pointer hover:bg-sky-400 rounded-r-md text-black"
        type="submit">
          <BiSearch size={25}/>
      </button>
    </form>
  )
}
