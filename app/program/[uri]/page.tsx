"use client";

import React, { useState, Suspense } from "react";
import { useAuth } from "@/app/AuthContext";
import ProgramNavigator from "./ProgramNavigator";
import Loading from "./loading";
import TopNavbar from "@/app/components/TopNavbar";
import PaymentForm from "./PaymentForm";
import { ProgramPageProps } from "@/interfaces/interfaces";
import AuthLayer from "@/app/components/AuthLayer";
import AppLayout from "@/app/components/AppLayout";
import { HeaderProgramPage } from "@/app/components/Header";

const hasProgramExpired = (expiryDate: string) => {
  const currentDate = new Date();
  const expirationDate = new Date(expiryDate);

  return expirationDate < currentDate;
};

const ProgramPage: React.FC<ProgramPageProps> = ({ params }) => {
  const { user, loading, purchasedProgram } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const expired =
    purchasedProgram && hasProgramExpired(purchasedProgram.expires);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <AppLayout>
        <div className="flex flex-col md:flex-row justify-between md:py-8 h-full">
          <TopNavbar myProgram={params.uri} />
          <AuthLayer
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            loginTitle={"Авторизуйтеся, щоб переглянути програму"}
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <main className="px-5 md:px-24 py-12 md:py-16 min-h-[100vh] h-auto md:h-[100vh] md:w-[100vw] z-0 bg-[url('/sources/second-bg.jpg')] bg-center">
      <HeaderProgramPage />
      {purchasedProgram?.uri === params.uri && purchasedProgram && !expired ? (
        <div className="flex flex-col md:flex-row justify-between md:py-8">
          <TopNavbar myProgram={params.uri} />
          <Suspense fallback={<Loading />}>
            <ProgramNavigator program={purchasedProgram.content!} />
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between py-10 h-full">
          {expired ? (
            <div className="md:mb-0 mb-10">
              <h2 className="text-2xl md:text-4xl text-left md:mb-2">
                Підписка на програму закінчилась
              </h2>
              <p>Здійсніть оплату, щоб відновити доступ до програми</p>
            </div>
          ) : (
            <div className="md:mb-0 mb-10">
              <h2 className="text-2xl md:text-4xl text-left md:mb-2">
                Умови та оплата
              </h2>
              <p>Ви зможете змінити програму в будь-який момент.</p>
            </div>
          )}
          <PaymentForm programURI={params.uri} />
        </div>
      )}
    </main>
  );
};

export default ProgramPage;
