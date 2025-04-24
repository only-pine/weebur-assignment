import fetchInitialData from "./apis/fetchInitialData";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import SearchForm from "./components/SearchForm";

export default async function Home() {
  const initialData = await fetchInitialData();

  return (
    <>
      <Header />
      <main className="w-full min-h-full min-w-[767px] m-auto">
        <div className="flex flex-col">
          <section className="sticky top-0 h-20 z-10 bg-white border border-gray-100">
            <SearchForm />
          </section>
          <ProductList productsData={initialData} />
        </div>
      </main>
    </>
  );
}
