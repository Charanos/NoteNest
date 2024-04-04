"use client";

import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import useLoadImage from "@/hooks/useLoadImage";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="p-3 gap-x-10 flex flex-col group relative items-center shadow-md justify-center overflow-hidden bg-alphaColor cursor-pointer hover:bg-betaColor/70 transition"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          fill
          alt="song image"
          className="object-cover"
          src={imagePath || "/images/songImage.jpg"}
        />
      </div>

      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>

        <p className="text-secondaryColor text-sm pb-4 w-full truncate">
          {data.artist}
        </p>
      </div>

      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
