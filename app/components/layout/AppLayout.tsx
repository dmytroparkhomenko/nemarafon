import React, { ReactNode } from "react";
import { HeaderProgramPage } from "@/app/components/common/Header";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] h-auto md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left ">
      <HeaderProgramPage />
      {children}
    </main>
  );
};

export default AppLayout;
