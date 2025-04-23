export default async function fetchInitialData() {
  const result = await fetch("https://dummyjson.com/products?limit=20&skip=0");

  if (!result.ok) {
    throw new Error("상품 목록을 가져오는데 실패했습니다.");
  }

  return result.json();
}
