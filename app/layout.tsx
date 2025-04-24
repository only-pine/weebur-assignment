import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";

const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Light.otf",
      weight: "300",
    },
    {
      path: "../public/fonts/Pretendard-Regular.otf",
      weight: "400",
    },
    {
      path: "../public/fonts/Pretendard-Medium.otf",
      weight: "500",
    },
    {
      path: "../public/fonts/Pretendard-Bold.otf",
      weight: "700",
    },
  ],
});

export const metadata: Metadata = {
  title: "위버 - 상품 목록",
  description: "상품 리스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
