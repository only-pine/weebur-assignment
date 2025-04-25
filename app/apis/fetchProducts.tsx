import { ProductsResponse } from "../types/product";

export default async function fetchProducts(
  paramPage: number = 0,
  paramQuery: string,
  paramSortBy: string,
  paramOrder: string
): Promise<ProductsResponse> {
  let url = "";

  if (paramQuery) {
    url = `https://dummyjson.com/products/search?q=${paramQuery}&limit=20&skip=${paramPage}`;
  } else {
    url = `https://dummyjson.com/products?limit=20&skip=${paramPage}`;
  }

  if (paramSortBy && paramOrder) {
    url += `&sortBy=${paramSortBy}&order=${paramOrder}`;
  }

  const result = await fetch(url);

  if (!result.ok) {
    throw new Error("상품 목록을 가져오는데 실패했습니다.");
  }

  return result.json();
}
