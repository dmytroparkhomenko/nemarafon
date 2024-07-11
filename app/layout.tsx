import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StrictMode } from "react";
import "./globals.scss";

import { AuthProvider } from "./AuthContext";
// import { nextArtFont } from "./fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "НЕмарафон 2024 | Анастасія Бутенко",
  description: "Digital marketplace for selling fitness programs",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <StrictMode>
      <html lang="uk-UA">
        <head>
          <link
            href="https://fonts.cdnfonts.com/css/next-art"
            rel="stylesheet"
          />
        </head>
        <body
          className={`overflow-x-hidden md:overscroll-none ${inter.className}`}
        >
          <AuthProvider>
            <main className="wrapper">{children}</main>
          </AuthProvider>
        </body>
      </html>
    </StrictMode>
  );
}
