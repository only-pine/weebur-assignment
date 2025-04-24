"use client";

import { ProductsResponse } from "@/app/types/product";
import gridImg from "@/public/images/grid.svg";
import listImg from "@/public/images/list.svg";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GridLayout from "./layout/GridLayout";

export default function ProductList({
  productsData,
}: {
  productsData: ProductsResponse;
}) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const toastOnceRef = useRef<boolean>(false);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["projects"],
      queryFn: async ({ pageParam = 0 }): Promise<ProductsResponse> => {
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${pageParam}`
        );
        if (!response.ok) throw new Error("목록 조회하는 데 실패했습니다.");
        return response.json();
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const nextSkip = lastPage.skip + lastPage.limit;
        return nextSkip < lastPage.total ? nextSkip : undefined;
      },
      initialData: {
        pages: [productsData],
        pageParams: [productsData.skip + productsData.limit],
      },
    });
  const products = data?.pages.flatMap((page) => page.products) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          } else if (
            entry.isIntersecting &&
            !hasNextPage &&
            !toastOnceRef.current
          ) {
            setShowToastMessage(true);
            toastOnceRef.current = true;

            setTimeout(() => {
              setShowToastMessage(false);
            }, 3000);
          }
        });
      },
      { rootMargin: "0% 0% 50% 0%", threshold: 0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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

      <GridLayout products={products} />

      <div ref={observerTarget} className="h-10"></div>

      {showToastMessage && (
        <div className="fixed left-1/2 bottom-10 -translate-x-1/2 z-50 flex px-5 py-3 text-white font-medium bg-gray-800/80 rounded-lg shadow-lg">
          더 이상 불러올 수 없습니다.
        </div>
      )}
    </section>
  );
}
