import { Nunito } from "next/font/google";
import "./globals.css";
import { Provider } from "@/shared/components/shared/providers";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="Logo.png" />
      </head>
      <body className={`${nunito.variable} ${nunito.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
