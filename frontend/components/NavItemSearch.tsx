import { BiSearch } from "react-icons/bi"
import { useState } from "react"

export default function NavItemSearch() {

  const [dropdownValue, setDropdownValue] = useState("all")

  function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    //validation

    formSubmitSearch()
  }

  async function formSubmitSearch() {
    console.log("Searching for")
    //fetch
  }

  return (
    <form onSubmit={ handleSubmit } className="flex h-8 self-center relative w-[40%]">
      <select
        className="bg-orange-300 h-8 hover:cursor-pointer hover:bg-orange-400 rounded-l-md text-black"
        value={ dropdownValue }
        onChange={(e) => setDropdownValue(e.target.value)}>
          <option value="all">All</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="jewelry">Jewelry</option>
          <option value="food">Food</option>
      </select>

      <input
        className="text-black h-8 indent-2 w-full font-medium"
        type="text" name="search" id="search" placeholder={`Search.. ${dropdownValue}`}
      />

      <button
        className="flex items-center px-1 bg-orange-300 h-8 hover:cursor-pointer hover:bg-orange-400 rounded-r-md text-black"
        type="submit"
        onClick={() => console.log("Searching")} >
          <BiSearch size={25}/>
      </button>
    </form>
  )
}

