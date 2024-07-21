import React, { ReactNode } from "react";
import { HeaderProgramPage } from "@/app/components/common/Header";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <main className="relative px-5 md:px-24 py-12 md:py-16 min-h-[100vh] h-auto z-0 bg-left bg-no-repeat bg-cover bg-[url('/sources/second-bg.jpg')]">
      <div className="fixed inset-0 -z-10 bg-[url('/sources/second-bg.jpg')] bg-auto bg-no-repeat bg-left"></div>
      <HeaderProgramPage />
      {children}
    </main>
  );
};

export default AppLayout;
