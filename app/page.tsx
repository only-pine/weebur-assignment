import Header from "./components/client/Header";
import ItemList from "./components/client/ItemList";
import SearchForm from "./components/client/SearchForm";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full min-h-full min-w-[767px] m-auto">
        <div className="flex flex-col">
          <section className="sticky top-0 h-20 z-10 bg-white border border-gray-100">
            <SearchForm />
          </section>
          <ItemList />
        </div>
      </main>
    </>
  );
}
