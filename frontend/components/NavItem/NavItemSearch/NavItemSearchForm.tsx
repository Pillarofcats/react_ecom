import React, { useEffect, useRef } from "react";
import { tProduct } from "../../../types/types";
import { BiSearch } from "react-icons/bi";

import NavItemLocalSearchProducts from "./NavItemLocalSearchProducts";
import { SetURLSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks/default";
import {
  getSearchProducts,
  resetProducts,
} from "../../../redux/slices/productsSlice";

import { useNavigate } from "react-router-dom";
import useURLParams from "../../../hooks/useURLParams";

export default function NavItemSearchForm({
  localSearch,
  setLocalSearch,
  toggleLocalSearch,
  setToggleLocalSearch,
  filteredProductsByLocalSearch,
}: {
  localSearch: URLSearchParams;
  setLocalSearch: SetURLSearchParams;
  toggleLocalSearch: boolean;
  setToggleLocalSearch: React.Dispatch<React.SetStateAction<boolean>>;
  filteredProductsByLocalSearch: tProduct[];
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { queryParams } = useURLParams();

  const search = localSearch.get("search") || "";

  const localSearchInputRef = useRef<HTMLInputElement>(null);
  const formSearchRef = useRef<HTMLFormElement>(null);
  const formSearchTimerRef = useRef<NodeJS.Timeout | null>(null);

  function handleSearchFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!localSearchInputRef.current) return;
    dispatch(resetProducts());

    const { value } = localSearchInputRef.current;
    dispatch(getSearchProducts(value));

    queryParams.set("page", "1");
    navigate(
      { pathname: "/products", search: queryParams.toString() },
      { replace: true }
    );
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalSearch((prev) => {
      prev.set("search", `${e.target.value}`);
      return prev;
    });
  }

  function onMouseLeaveSearchBar(
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) {
    if (search.length < 1) return;
    e.preventDefault();

    formSearchTimerRef.current = setTimeout(() => {
      setToggleLocalSearch(false);
    }, 500);
  }

  function onMouseEnterSearchBar(
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) {
    if (search.length < 1) return;
    e.preventDefault();

    setToggleLocalSearch(true);
    clearTimeout(formSearchTimerRef.current as NodeJS.Timeout);
  }

  useEffect(() => {
    if (search.length > 0) {
      setToggleLocalSearch(true);
    } else {
      setToggleLocalSearch(false);
      dispatch(resetProducts());
    }
  }, [search, setToggleLocalSearch, dispatch]);

  useEffect(() => {
    return () => {
      clearTimeout(formSearchTimerRef.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <form
      className="relative flex flex-1"
      ref={formSearchRef}
      onSubmit={handleSearchFormSubmit}
      onMouseEnter={onMouseEnterSearchBar}
      onMouseLeave={onMouseLeaveSearchBar}>
      <input
        ref={localSearchInputRef}
        onChange={onSearchChange}
        className="w-full text-black h-8 indent-2 font-medium"
        value={search}
        type="search"
        name="search"
        placeholder={`Search.. `}
        autoComplete="off"
      />

      {toggleLocalSearch ? (
        <NavItemLocalSearchProducts
          filteredLocalSearchProducts={filteredProductsByLocalSearch}
        />
      ) : null}

      <button
        className="px-1 h-8 bg-sky-300 hover:cursor-pointer hover:bg-sky-400 rounded-r-md text-black"
        type="submit">
        <BiSearch size={25} />
      </button>
    </form>
  );
}
