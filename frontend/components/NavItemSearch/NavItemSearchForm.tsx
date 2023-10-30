import { useEffect, useRef } from "react"
import { tProduct } from "../../types/types"
import { BiSearch } from "react-icons/bi"

import NavItemLocalSearchProducts from "./NavItemLocalSearchProducts"

export default function NavItemLocalSearchForm({ localSearch, setLocalSearch, toggleLocalSearch, setToggleLocalSearch, filteredProductsByLocalSearch }:{ localSearch:string, setLocalSearch:React.Dispatch<React.SetStateAction<string>>, toggleLocalSearch:boolean, setToggleLocalSearch:React.Dispatch<React.SetStateAction<boolean>>, filteredProductsByLocalSearch:tProduct[] }) {

  const localSearchInputRef = useRef<HTMLInputElement>(null)
  const formSearchRef = useRef<HTMLFormElement>(null)
  const formSearchTimerRef = useRef<NodeJS.Timeout | null>(null)

  function handleSearchFormSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (document.activeElement !== localSearchInputRef.current) return
    if(filteredProductsByLocalSearch.length < 1) return
  }

  function onSearchChange(e:React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch(e.target.value)
  }

  function onMouseLeaveSearchBar(e:React.MouseEvent<HTMLFormElement, MouseEvent>) {
    if(localSearch.length < 1) return
    e.preventDefault()
    console.log("Left the form")
    formSearchTimerRef.current = setTimeout(() => {
      setToggleLocalSearch(false)
    }, 500)
  }

  function onMouseEnterSearchBar(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    if(localSearch.length < 1) return
    e.preventDefault()
    console.log("Enter the form")
    if(localSearch) setToggleLocalSearch(true)
    clearTimeout(formSearchTimerRef.current as NodeJS.Timeout)
  }

  useEffect(() => {
    if(localSearch.length > 0) {
      setToggleLocalSearch(true)
    } else {
      setToggleLocalSearch(false)
    }
  }, [localSearch, setToggleLocalSearch])

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
        value={ localSearch }
        type="text" name="search" id="search" placeholder={`Search.. `}
      />

      { toggleLocalSearch ?
          <NavItemLocalSearchProducts filteredLocalSearchProducts={filteredProductsByLocalSearch} setLocalSearch={setLocalSearch} />
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
