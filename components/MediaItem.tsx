"use client";

import { Song } from "@/types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);
  const handeClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO: Default turn on player
  };

  return (
    <div
      className="flex py-2 rounded-md items-center gap-x-3 cursor-pointer hover:bg-betaColor"
      onClick={handeClick}
    >
      <div className="relative rounded-full min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          alt="songImage"
          className="object-cover"
          src={imageUrl || "/images/songImage.jpg"}
        />
      </div>

      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-textColor truncate"> {data.title} </p>
        <p className="text-secondaryColor/70 text-sm truncate">
          {" "}
          {data.artist}{" "}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
