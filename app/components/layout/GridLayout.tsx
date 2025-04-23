import Image from "next/image";
import starImg from "@/public/images/star.svg";

export default function GridLayout() {
  return (
    <section className="grid grid-cols-4 mt-5">
      <article className="flex flex-col items-center justify-center">
        <Image src="" alt="item" width={80} height={80} />
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-lg font-bold">Essence Mascara Lash Princess</p>
            <p className="text-base">
              The Essence Mascara Lash Princess is a popular mascara known for
              its volumizing and lengthening effects. Achieve dramatic lashes
              with this long-lasting and cruelty-free formula.
            </p>
          </div>
          <div className="flex flex-row min-w-[120px] gap-2">
            <div className="flex flex-row gap-2">
              <Image src={starImg} width={20} height={20} alt="star" />
              4.94 (3)
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
