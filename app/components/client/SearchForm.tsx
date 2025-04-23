import Image from "next/image";
import checkImg from "@/public/images/check.svg";
import downArrowImg from "@/public/images/down-arrow.svg";
import searchImg from "@/public/images/search.svg";

export default function SearchForm() {
  return (
    <form className="flex flex-row w-3/4 m-auto p-5 gap-5">
      <div className="relative">
        <button
          type="button"
          className="grid grid-cols-1 min-w-36 h-12 py-1.5 pl-3 pr-2 rounded-md bg-white text-left text-gray-900 outline-1 outline-gray-300 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-200"
        >
          <span className="col-start-1 row-start-1 flex items-center justify-between">
            <span className="block">정렬</span>
            <Image src={downArrowImg} width={25} height={25} alt="down-arrow" />
          </span>
        </button>
        <ul
          className="absolute z-10 max-h-56 mt-1 py-1 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden"
          tabIndex={-1}
        >
          <li
            id="listbox-option-0"
            role="option"
            aria-selected="true"
            className="group relative flex items-center min-w-36 py-2 pl-3 pr-9 select-none text-gray-900"
          >
            <span className="ml-2 block group-data-selected:font-semibold">
              낮은 별점순
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600 size-8 group-not-data-selected:hidden">
              <Image src={checkImg} width={18} height={18} alt="check" />
            </span>
          </li>
        </ul>
      </div>
      <div className="flex flex-row items-center h-12 pl-2 gap-2 rounded-md bg-gray-100">
        <Image src={searchImg} width={25} height={25} alt="search" />
        <input
          type="text"
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
