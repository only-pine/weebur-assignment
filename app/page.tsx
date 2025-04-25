import fetchProducts from "./apis/fetchProducts";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import SearchForm from "./components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const params = await searchParams;
  const paramQuery = params.q || "";
  const paramSortBy = params.sortBy || "";
  const paramOrder = params.order || "";

  const initialData = await fetchProducts(
    0,
    paramQuery,
    paramSortBy,
    paramOrder
  );

  return (
    <>
      <Header />
      <main className="w-full min-h-full min-w-[767px] m-auto">
        <div className="flex flex-col">
          <section className="sticky top-0 h-20 z-10 bg-white border border-gray-100">
            <SearchForm
              paramQuery={paramQuery}
              paramSortBy={paramSortBy}
              paramOrder={paramOrder}
            />
          </section>
          <ProductList
            productsData={initialData}
            paramQuery={paramQuery}
            paramSortBy={paramSortBy}
            paramOrder={paramOrder}
          />
        </div>
      </main>
    </>
  );
}
