"use client";

import React, { useState, useEffect } from "react";

import AuthLayer from "@/app/components/layout/AuthLayer";
import UserProfile from "@/app/components/profile/UserProfile";
import { useAuth } from "@/app/AuthContext";

import TopNavbar from "@/app/components/navigation/TopNavbar";
import Loading from "../loading";
import { getProgramByURI } from "../api/programs-fetching";
import { ProgramData } from "@/interfaces/interfaces";
import AppLayout from "@/app/components/layout/AppLayout";

export default function Profile() {
  const { user, loading, purchasedProgram } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [programContent, setProgramContent] = useState<ProgramData | null>(
    null
  );

  useEffect(() => {
    async function fetchProgramContent() {
      if (purchasedProgram?.uri) {
        const content = await getProgramByURI(purchasedProgram.uri);
        setProgramContent(content);
      } else {
        setProgramContent({
          title: "Ви ще не придбали жодної програми",
        });
      }
    }

    fetchProgramContent();
  }, [purchasedProgram?.uri]);

  if (loading || !programContent) return <Loading />;

  return (
    <AppLayout>
      <div className="flex flex-col items-stretch md:flex-row justify-start md:justify-between md:my-8 h-[-webkit-fill-available]">
        <TopNavbar
          myProgram={`/program/${
            purchasedProgram ? purchasedProgram?.uri : "#"
          }`}
          isProgramPage={false}
        />

        {user ? (
          <UserProfile programContent={programContent} />
        ) : (
          <AuthLayer isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </div>
    </AppLayout>
  );
}
