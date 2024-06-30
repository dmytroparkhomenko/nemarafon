import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StrictMode } from "react";
import "./globals.scss";

import { AuthProvider } from "./AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nemarafon",
  description: "Digital marketplace for selling fitness programs",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <StrictMode>
      <html lang="uk-UA">
        <body className={`overflow-x-hidden ${inter.className}`}>
          <AuthProvider>
            <main className="wrapper">{children}</main>
          </AuthProvider>
        </body>
      </html>
    </StrictMode>
  );
}
