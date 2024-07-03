import { HeaderProgramPage } from "./Header";

const AppLayout = ({ children }: any) => {
  return (
    <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-left">
      <HeaderProgramPage />
      {children}
    </main>
  );
};

export default AppLayout;
