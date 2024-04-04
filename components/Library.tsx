"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import UseAuthModal from "@/hooks/UseAuthModal";
import useUploadModal from "@/hooks/useUploadModal";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user } = useUser();
  const onPlay = useOnPlay(songs);
  const authModal = UseAuthModal();
  const uploadModal = useUploadModal();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    // TODO: check for subscription

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex ic justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={25} className="text-textColor/75" />
          <p className="text-textColor font-medium text-md capitalize font-secondaryFont">
            your library
          </p>
        </div>

        <AiOutlinePlus
          size={20}
          onClick={onClick}
          className="text-textColor/60 cursor-pointer transition hover:text-textColor"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-5 px-5 text-textColor ">
        {songs.map((item) => (
          <MediaItem
            data={item}
            key={item.id}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
