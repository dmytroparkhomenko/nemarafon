"use client";

import React, { useState, useEffect } from "react";

import { HeaderProgramPage } from "@/app/components/Header";

import AuthLayer from "../components/AuthLayer";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../AuthContext";

import TopNavbar from "../components/TopNavbar";
import Loading from "../loading";
import { getProgramByURI } from "../api/programs-fetching";
import { ProgramData } from "@/interfaces/interfaces";
import AppLayout from "../components/AppLayout";

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
          uri: "",
          title: "No program purchased yet",
          description: "",
          purchaseDate: "",
          expires: "",
        });
      }
    }

    fetchProgramContent();
  }, [purchasedProgram?.uri]);

  if (loading || !programContent) return <Loading />;

  return (
    <AppLayout>
      <div className="flex flex-col items-stretch md:flex-row justify-between md:my-8 h-[-webkit-fill-available]">
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
