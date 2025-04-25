import gridImg from "@/public/images/grid.svg";
import listImg from "@/public/images/list.svg";
import Image from "next/image";
import { LayoutType } from "../types/search";

export default function LayoutToggle({
  layoutType,
  changeLayoutType,
}: {
  layoutType: LayoutType | "";
  changeLayoutType: (newType: LayoutType) => void;
}) {
  return (
    <div className="flex w-fit rounded-lg bg-gray-100 border-2 border-gray-100">
      <button
        className={`${layoutType === "list" && "bg-white"} p-2 rounded-l-md`}
        onClick={() => changeLayoutType("list")}
      >
        <Image src={listImg} width={30} height={30} alt="list" />
      </button>
      <button
        className={`${layoutType === "grid" && "bg-white"} p-2 rounded-r-md`}
        onClick={() => changeLayoutType("grid")}
      >
        <Image src={gridImg} width={30} height={30} alt="grid" />
      </button>
    </div>
  );
}
