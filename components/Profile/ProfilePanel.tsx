"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import UserProfileDialog from "./UserProfileDialog";
import CoverImageDialog from "./CoverImageDialog";
import { getUserById } from "@/lib/actions/user.action";

const ProfilePanel = () => {
  const [coverImage, setCoverImage] = useState("/images/profile-cover.png");
  const { user } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.publicMetadata.userId) {
        const userId = +user.publicMetadata.userId;
        const dbUser = await getUserById(userId);
        if (dbUser && dbUser.coverImg) {
          setCoverImage(dbUser.coverImg);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const updateCoverImage = (newCoverImageUrl: string) => {
    setCoverImage(newCoverImageUrl);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, username, imageUrl } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="w-full min-w-[327px] h-[301px] relative bg-white-50 dark:bg-gray-850 rounded-[10px] mb-10">
      {/* Profile Image */}
      <Image src={imageUrl} alt="profile-picture" width={70} height={70} className="z-10 rounded-full left-[13px] top-[115px] lg:left-[31px] lg:top-[119px] absolute w-[70px] h-[70px] lg:w-40 lg:h-40" />

      {/* Cover Image */}
      <div className="flex h-[150px] lg:h-[184px] relative">
        <Image src={coverImage} alt="cover-picture" width={375} height={150} loading="eager" className="rounded-t-[10px] w-full z-0 h-auto object-cover" />
        <CoverImageDialog onCoverImageUpdated={updateCoverImage} />
      </div>

      {/* Profile Details */}
      <div className="lg:ml-[223px] lg:mt-[30px] flex items-start justify-start">
        <div className="flex flex-col pt-[45px] lg:pt-0 gap-2 ml-[13px] lg:ml-0">
          <div className="w-full text-gray-900 dark:text-white-50 text-xl font-bold">{fullName}</div>
          <div className="w-full text-gray-400 text-sm font-normal">{`@${username}`}</div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="absolute right-[13px] bottom-5 lg:right-[50px] lg:bottom-[42px]">
        <UserProfileDialog />
      </div>
    </div>
  );
};

export default ProfilePanel;
