import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StrictMode } from "react";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nemarafon",
  description: "Digital marketplace for selling fitness-programs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang="uk-UA">
        <body className={`overflow-x-hidden ${inter.className}`}>
          <main className="wrapper ">{children}</main>
        </body>
      </html>
    </StrictMode>
  );
}
