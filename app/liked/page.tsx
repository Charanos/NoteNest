import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import getLikedSongs from "@/actions/getLikedSongs";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="h-full w-full rounded-lg overflow-hidden overflow-y-auto bg-alphaColor">
      <Header>
        <div className="mt-20">
          <div className="flex flex-row items-center gap-x-5">
            <div className="relative h-20 w-20 md:h-35 md:w-35">
              <Image
                fill
                alt="playlist"
                src="/images/liked.png"
                className="object-cover md:p-4 p-1 bg-betaColor"
              />
            </div>

            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="font-semibold text-accentColor2 capitalize text-sm">
                playlist
              </p>

              <h1 className="uppercase font-secondaryFont md:text-4xl text-3xl">
                liked songs
              </h1>
            </div>
          </div>
        </div>
      </Header>

      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
