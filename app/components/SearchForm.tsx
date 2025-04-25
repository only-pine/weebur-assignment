"use client";

import {
  DEFAULT_SORT,
  SEARCH_BUTTON_TEXT,
  SEARCH_INPUT_PLACEHOLDER,
  SORT_OPTIONS,
} from "@/app/constants/constants";
import searchImg from "@/public/images/search.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Dropdown from "./Dropdown";

export default function SearchForm({
  paramQuery,
  paramSortBy,
  paramOrder,
}: {
  paramQuery: string;
  paramSortBy: string;
  paramOrder: string;
}) {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [formQuery, setFormQuery] = useState<string>(paramQuery);
  const [formSort, setFormSort] = useState<string>(() => getCurrentSort());

  function getCurrentSort(): string {
    for (const [key, value] of Object.entries(SORT_OPTIONS)) {
      if (value["sortBy"] === paramSortBy && value["order"] === paramOrder) {
        return key;
      }
    }

    return DEFAULT_SORT;
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (formQuery) {
      params.set("q", formQuery);
    }

    if (formSort !== DEFAULT_SORT) {
      params.set("sortBy", SORT_OPTIONS[formSort].sortBy);
      params.set("order", SORT_OPTIONS[formSort].order);
    }

    router.replace(`?${params.toString()}`);
  }

  function handleSortSelect(sortType: string) {
    setFormSort(sortType);
    setIsDropdownOpen(false);
  }

  return (
    <form
      className="flex flex-row w-3/4 m-auto p-5 gap-5"
      onSubmit={handleSearch}
    >
      <Dropdown
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        formSort={formSort}
        onClick={handleSortSelect}
        items={Object.keys(SORT_OPTIONS)}
      />

      <div className="flex flex-row items-center h-12 pl-2 gap-2 rounded-md bg-gray-100">
        <Image src={searchImg} width={25} height={25} alt="search" />
        <input
          type="text"
          value={formQuery}
          onChange={(e) => setFormQuery(e.target.value)}
          placeholder={SEARCH_INPUT_PLACEHOLDER}
          className="bg-transparent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-18 h-12 p-2 rounded-md bg-black text-white"
      >
        {SEARCH_BUTTON_TEXT}
      </button>
    </form>
  );
}
