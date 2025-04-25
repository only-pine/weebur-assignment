"use client";

import { PRODUCT_UNIT, REVIEW_TEXT } from "@/app/constants/constants";
import { Product } from "@/app/types/product";
import starImg from "@/public/images/star.svg";
import Image from "next/image";

export default function ListLayout({ products }: { products: Product[] }) {
  return (
    <section>
      {products.map((product) => (
        <article
          className="grid grid-cols-[150px_1fr_auto] w-full mt-6 gap-2"
          key={product.id}
        >
          <Image src={product.thumbnail} width={150} height={150} alt="item" />
          <div className="flex flex-row gap-10">
            <div className="flex flex-col flex-1">
              <p className="text-lg font-bold">{product.title}</p>
              <p className="text-base">{product.description}</p>
            </div>
            <div className="flex flex-col item-end min-w-[100px] gap-2">
              <div className="flex flex-row gap-0.5 justify-end">
                <Image src={starImg} width={20} height={20} alt="star" />
                {product.rating}
              </div>
              <p className="block text-right">
                {REVIEW_TEXT} {product.reviews.length}
                {PRODUCT_UNIT}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
