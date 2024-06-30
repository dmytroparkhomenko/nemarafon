import React, { useState, useEffect } from "react";
import Image from "next/image";
import DefaultUserProfileImage from "@/public/sources/temp/review.png";
import Button from "@/app/components/Button";
import { useAuth } from "../AuthContext";
import { User } from "firebase/auth";
import { ProgramCardProps } from "@/interfaces/interfaces";
import { getPrograms } from "@/app/api/programs-fetching/index";

interface UserProfileProps {
  user: User;
  program: any;
}

const UserProfile: React.FC<UserProfileProps> = async ({ user, program }) => {
  const { signOut } = useAuth();

  const posts: ProgramCardProps[] = await getPrograms();
  const post: ProgramCardProps | undefined = posts.find(
    (post) => post.uri === `/${program.uri}/`
  );

  return (
    <div className="user profile flex flex-col md:flex-row w-full gap-10 md:gap-5 my-5">
      <div className="w-full md:w-1/4 text-center">
        {user.photoURL ? (
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
            {user.displayName || "Loading..."}
          </span>
        </div>
        <Button
          className="text-sm md:mt-0 px-4 !w-auto"
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
            <div>
              <h5>Телеграм</h5>
              <p>---</p>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-6">
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
        <h5>{post?.title || program.title}</h5>
        <p>{post?.programFields.programShortDescription}</p>
        {program.expires && (
          <>
            <p>Expires on: {program?.expires}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
