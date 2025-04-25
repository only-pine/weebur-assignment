"use client";

import { Product } from "../types/product";
import { LayoutType } from "../types/search";
import GridLayout from "./layout/GridLayout";
import ListLayout from "./layout/ListLayout";

export default function ProductListContent({
  products,
  layoutType,
}: {
  products: Product[];
  layoutType: LayoutType;
}) {
  if (products.length === 0) {
    return (
      <div className="flex mx-auto my-10 text-xl text-semibold">
        일치하는 결과가 없습니다.
      </div>
    );
  }

  return layoutType === "list" ? (
    <ListLayout products={products} />
  ) : (
    <GridLayout products={products} />
  );
}
