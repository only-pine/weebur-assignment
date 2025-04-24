import { Product } from "@/app/types/product";
import starImg from "@/public/images/star.svg";
import Image from "next/image";

export default function GridLayout({ products }: { products: Product[] }) {
  return (
    <section className="grid grid-cols-4 mt-5 gap-3">
      {products.map((product) => (
        <article
          key={product.id}
          className="flex flex-col items-center mb-15 gap-3"
        >
          <Image src={product.thumbnail} alt="item" width={150} height={150} />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">{product.title}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
            <div className="flex flex-row gap-0.5">
              <Image src={starImg} width={20} height={20} alt="star" />
              {product.rating} ({product.reviews.length})
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
