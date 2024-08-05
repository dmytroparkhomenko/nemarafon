"use client";

import React, { useState, Suspense } from "react";
import { useAuth } from "@/app/AuthContext";
import ProgramNavigator from "./ProgramNavigator";
import Loading from "./loading";
import TopNavbar from "@/app/components/navigation/TopNavbar";
import PaymentForm from "./PaymentForm";
import { ProgramPageProps } from "@/interfaces/interfaces";
import AuthLayer from "@/app/components/layout/AuthLayer";
import AppLayout from "@/app/components/layout/AppLayout";

const hasProgramExpired = (expiryDate: string) => {
  const [day, month, year] = expiryDate.split(".").map(Number);

  const expirationDate = new Date(year, month - 1, day);

  const currentDate = new Date();

  return expirationDate < currentDate;
};

const ProgramPage: React.FC<ProgramPageProps> = ({ params }) => {
  const { user, loading, purchasedProgram } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const expired =
    purchasedProgram && hasProgramExpired(purchasedProgram.expirationDate);

  if (loading) {
    return <Loading />;
  }

  if (!user || !user.emailVerified) {
    return (
      <AppLayout>
        <div className="flex flex-col md:flex-row justify-start md:justify-between md:py-8 h-full">
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
    <AppLayout>
      {(purchasedProgram?.uri === params.uri &&
        purchasedProgram.content &&
        !expired) ||
      purchasedProgram?.isAdmin ? (
        <div className="flex flex-col md:flex-row md:justify-between justify-start md:py-8 h-[-webkit-fill-available]">
          <TopNavbar myProgram={params.uri} />
          <Suspense fallback={<Loading />}>
            <ProgramNavigator
              currentURI={params.uri}
              program={purchasedProgram.content!}
            />
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-start md:justify-between py-10 h-full">
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
    </AppLayout>
  );
};

export default ProgramPage;
