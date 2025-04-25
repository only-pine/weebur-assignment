import checkImg from "@/public/images/check.svg";
import downArrowImg from "@/public/images/down-arrow.svg";
import Image from "next/image";

export default function Dropdown({
  isDropdownOpen,
  setIsDropdownOpen,
  formSort,
  onClick,
  items,
}: {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  formSort: string;
  onClick: (option: string) => void;
  items: string[];
}) {
  return (
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
          {items.map((item) => (
            <li
              key={item}
              role="option"
              aria-selected={formSort === item}
              className="group relative flex items-center min-w-36 py-2 pl-3 pr-9 select-none text-gray-900"
              onClick={() => onClick(item)}
            >
              <span className="ml-2 block group-aria-selected:font-medium">
                {item}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600 size-8 group-not-aria-selected:hidden">
                <Image src={checkImg} width={18} height={18} alt="check" />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
