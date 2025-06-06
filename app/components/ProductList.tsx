"use client";

import { ProductsResponse } from "@/app/types/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import fetchProducts from "../apis/fetchProducts";
import { MESSAGES, PRODUCT_UNIT, TOTAL_TEXT } from "../constants/constants";
import useLayoutType from "../hooks/useLayoutType";
import LayoutToggle from "./LayoutToggle";
import LoadingSpinner from "./LoadingSpinner";
import ProductListContent from "./ProductListContent";
import ToastMessage from "./ToastMessage";

export default function ProductList({
  productsData,
  paramQuery,
  paramSortBy,
  paramOrder,
}: {
  productsData: ProductsResponse;
  paramQuery: string;
  paramSortBy: string;
  paramOrder: string;
}) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const toastOnceRef = useRef<boolean>(false);
  const initialLoadDataRef = useRef<boolean>(false);
  const [showToastMessage, setShowToastMessage] = useState(false);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["projects", paramQuery, paramSortBy, paramOrder],
      queryFn: async ({ pageParam = 0 }): Promise<ProductsResponse> => {
        return await fetchProducts(
          pageParam,
          paramQuery,
          paramSortBy,
          paramOrder
        );
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

  const [layoutType, changeLayoutType] = useLayoutType();

  useEffect(() => {
    toastOnceRef.current = false;
    initialLoadDataRef.current = true;
    setShowToastMessage(false);
  }, [paramQuery, paramSortBy, paramOrder]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (checkFetchNextPage(entry.isIntersecting)) {
            fetchNextPage();

            if (initialLoadDataRef.current) {
              initialLoadDataRef.current = false;
            }
          } else if (checkShowToast(entry.isIntersecting)) {
            setShowToastMessage(true);
            toastOnceRef.current = true;

            setTimeout(() => {
              setShowToastMessage(false);
            }, 3000);
          }
        });
      },
      { rootMargin: "0% 0% 30% 0%", threshold: 0 }
    );

    function checkFetchNextPage(isIntersecting: boolean): boolean {
      return isIntersecting && hasNextPage && !isFetchingNextPage;
    }

    function checkShowToast(isIntersecting: boolean): boolean {
      return (
        isIntersecting &&
        !hasNextPage &&
        !toastOnceRef.current &&
        !initialLoadDataRef.current
      );
    }

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
        <p className="flex items-center">
          {TOTAL_TEXT} <b>{productsData.total}</b>
          {PRODUCT_UNIT}
        </p>
        <LayoutToggle
          layoutType={layoutType}
          changeLayoutType={changeLayoutType}
        />
      </div>

      <div className="h-[1px] bg-gray-100"></div>

      <ProductListContent products={products} layoutType={layoutType} />

      <div ref={observerTarget} className="h-10">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>

      {showToastMessage && <ToastMessage message={MESSAGES.NO_MORE_DATA} />}
    </section>
  );
}
