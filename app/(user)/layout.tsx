import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Danang Treasure Hunt",
  description: "Explore Danang through an exciting treasure hunt adventure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-[715px] flex justify-center flex-col">{children}</div>
      <Footer />
    </>
  );
}
