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

const ProgramPage: React.FC<ProgramPageProps> = ({ params }) => {
  const { user, loading, purchasedProgram } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

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
    <AppLayout>
      {purchasedProgram?.uri === params.uri && purchasedProgram ? (
        <div className="flex flex-col md:flex-row justify-between md:py-8">
          <TopNavbar myProgram={params.uri} />
          <Suspense fallback={<Loading />}>
            <ProgramNavigator program={purchasedProgram.content!} />
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between py-10 h-full">
          <div className="md:mb-0 mb-10">
            <h2 className="text-2xl md:text-4xl text-left md:mb-2">
              Умови та оплата
            </h2>
            <p>Ви можете змінити наявну програму в будь-який момент</p>
          </div>
          <PaymentForm programURI={params.uri} />
        </div>
      )}
    </AppLayout>
  );
};

export default ProgramPage;
