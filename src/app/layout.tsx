import type { Metadata } from "next";
import { Nunito_Sans, Noto_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/globals/Sidebar";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--nunito-sans",
  display: "swap",
  preload: true,
});
const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--noto",
  preload: true,
});

export const metadata: Metadata = {
  title: "Sephora Technical Test",
  description: "Sephora Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${noto.variable} antialiased font-body relative p-3 h-svh grid grid-cols-12 gap-2`}
      >
        <div className="fixed md:relative z-10 left-0 w-full h-svh md:h-full col-span-12 md:col-span-3 flex flex-col gap-4">
          <Sidebar />
        </div>
        <main className="col-span-12 md:col-span-9 flex">
          <div className="p-4 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 pb-3">
              <h1 className="text-3xl font-bold font-title">
                Sephora Technical Test
              </h1>
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
