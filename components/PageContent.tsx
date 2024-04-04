"use client";

import { Song } from "@/types";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="uppercase font-secondaryFont mt-10 mx-auto bg-betaColor w-[90%] h-[20vh] grid place-items-center">
        no songs have been uploaded.
      </div>
    );
  }

  return (
    <div className="pt-6 grid gap-5 grid-cols-2 md:grid-cols-4 min-w-[20rem]">
      {songs.map((item) => (
        <SongItem
          data={item}
          key={item.id}
          onClick={(id: string) => {
            onPlay(id);
          }}
        />
      ))}
    </div>
  );
};

export default PageContent;
