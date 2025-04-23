import { ProductsResponse } from "@/app/types/product";
import gridImg from "@/public/images/grid.svg";
import listImg from "@/public/images/list.svg";
import Image from "next/image";
import GridLayout from "./layout/GridLayout";

export default function ProductList({
  productsData,
}: {
  productsData: ProductsResponse;
}) {
  return (
    <section className="flex flex-col w-3/4 mx-auto px-5 py-10 gap-2 bg-white">
      <div className="flex justify-between">
        <p className="flex items-center">총 {productsData.total}개</p>
        <div className="flex w-fit p-2 gap-3 rounded-lg bg-gray-100">
          <button>
            <Image src={listImg} width={30} height={30} alt="list" />
          </button>
          <button>
            <Image src={gridImg} width={30} height={30} alt="grid" />
          </button>
        </div>
      </div>
      <div className="h-[1px] bg-gray-100"></div>
      <GridLayout products={productsData.products} />
    </section>
  );
}
