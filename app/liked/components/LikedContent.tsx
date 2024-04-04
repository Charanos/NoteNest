"use client";

import { Song } from "@/types";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }),
    [user, router, isLoading];

  if (songs.length === 0) {
    return (
      <div className="uppercase font-secondaryFont mt-20 mx-auto bg-betaColor w-[90%] h-[20vh] grid place-items-center">
        no liked songs!
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-6 gap-y-3">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>

          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
