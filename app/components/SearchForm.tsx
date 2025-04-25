"use client";

import { SORT_OPTIONS } from "@/app/constants/constants";
import checkImg from "@/public/images/check.svg";
import downArrowImg from "@/public/images/down-arrow.svg";
import searchImg from "@/public/images/search.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

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

    return "기본 정렬순";
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (formQuery) {
      params.set("q", formQuery);
    }

    if (formSort !== "기본 정렬순") {
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
      <div className="relative">
        <button
          type="button"
          className="grid grid-cols-1 min-w-36 h-12 py-1.5 pl-3 pr-2 rounded-md bg-white text-left text-gray-900 outline-1 outline-gray-300 -outline-offset-1"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="col-start-1 row-start-1 flex items-center justify-between">
            <span className="block">{formSort}</span>
            <Image src={downArrowImg} width={25} height={25} alt="down-arrow" />
          </span>
        </button>
        {isDropdownOpen && (
          <ul
            className="absolute z-10 max-h-56 mt-1 py-1 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden"
            tabIndex={-1}
          >
            {Object.keys(SORT_OPTIONS).map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={formSort === option}
                className="group relative flex items-center min-w-36 py-2 pl-3 pr-9 select-none text-gray-900"
                onClick={() => handleSortSelect(option)}
              >
                <span className="ml-2 block group-aria-selected:font-medium">
                  {option}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600 size-8 group-not-aria-selected:hidden">
                  <Image src={checkImg} width={18} height={18} alt="check" />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-row items-center h-12 pl-2 gap-2 rounded-md bg-gray-100">
        <Image src={searchImg} width={25} height={25} alt="search" />
        <input
          type="text"
          value={formQuery}
          onChange={(e) => setFormQuery(e.target.value)}
          placeholder="상품 검색"
          className="bg-transparent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-18 h-12 p-2 rounded-md bg-black text-white"
      >
        검색
      </button>
    </form>
  );
}
