import React from "react";
import Image from "next/image";
import DefaultUserProfileImage from "@/public/sources/temp/review.png";
import Button from "@/app/components/Button";
import { useAuth } from "../AuthContext";

import Loading from "../loading";
import Link from "next/link";

interface UserProfileProps {
  programContent: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ programContent }) => {
  const { user, loading, purchasedProgram, signOut } = useAuth();

  if (loading) return <Loading />;

  return (
    <div className="user profile flex flex-col md:flex-row w-full gap-10 md:gap-5">
      <div className="w-full md:w-1/4 text-center">
        {user?.photoURL ? (
          <Image
            src={user?.photoURL}
            width={100}
            height={100}
            alt="User profile"
            className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-full mb-5 mx-auto"
          />
        ) : (
          <Image
            src={DefaultUserProfileImage}
            alt="Default user profile"
            className="w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-full mb-5 mx-auto"
          />
        )}

        <div className="mb-4">
          <span className="uppercase text-lg font-titles tracking-wider text-center">
            {user?.displayName}
          </span>
        </div>
        <Button
          className="md:mt-0 px-4 !text-sm !w-auto"
          onClick={() => signOut()}
        >
          Вийти з аккаунту
        </Button>
      </div>
      <div className="w-full md:px-10">
        <h3 className="mb-4 text-left text-ivory text-xl md:text-2xl">
          контактна інформація
        </h3>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-1/2 gap-6">
            <div>
              <h5>Email</h5>
              <p>{user?.email}</p>
            </div>
            <div className="hidden md:block">
              <h5>Телеграм</h5>
              <p>---</p>
            </div>
          </div>
          <div className="flex-col w-1/2 gap-6 hidden md:flex">
            <div>
              <h5>Телефон</h5>
              <p>---</p>
            </div>
            <div>
              <h5>Інстаграм</h5>
              <p>---</p>
            </div>
          </div>
        </div>
        <h3 className="mt-14 mb-4 text-left text-ivory text-xl md:text-2xl">
          програма
        </h3>
        <Link
          href={
            purchasedProgram?.isAdmin
              ? "program/"
              : programContent?.uri
              ? `program/${programContent.uri}`
              : "#"
          }
        >
          <h5>
            {purchasedProgram?.isAdmin
              ? "Всі програми доступні"
              : programContent?.title}
          </h5>
        </Link>
        {purchasedProgram?.isAdmin === false && programContent?.uri ? (
          <>
            <p>{programContent?.programFields.programShortDescription}</p>
            <p className="mt-1">
              Підписка на програму до: {purchasedProgram?.expirationDate}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfile;
