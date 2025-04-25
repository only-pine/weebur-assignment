import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center w-full h-20 bg-blue-100 shadow-sm">
      <Image
        src="https://cdn.weebur.com/assets/bi/logo.svg"
        alt="logo"
        width={150}
        height={50}
        className="pl-10"
      />
    </header>
  );
}
