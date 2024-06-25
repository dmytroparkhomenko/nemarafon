import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StrictMode } from "react";
import "./globals.scss";

// import SessionProviderWrapper from "./SessionProvider";
import { AuthProvider } from "./AuthContext"; // Update the path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nemarafon",
  description: "Digital marketplace for selling fitness programs",
};

type RootLayoutProps = {
  children: React.ReactNode;
  pageProps: any;
};

export default function RootLayout({
  children,
  pageProps = {},
}: RootLayoutProps) {
  return (
    <StrictMode>
      <html lang="uk-UA">
        <body className={`overflow-x-hidden ${inter.className}`}>
          <AuthProvider>
            {/* <SessionProviderWrapper session={pageProps.session}> */}
            <main className="wrapper">{children}</main>
            {/* </SessionProviderWrapper> */}
          </AuthProvider>
        </body>
      </html>
    </StrictMode>
  );
}
