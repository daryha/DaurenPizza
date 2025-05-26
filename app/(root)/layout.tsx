import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/shared/components/shared/header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Next Pizza | Главная ",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {modal}
      {children}
    </main>
  );
}
