"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSong";
import useGetSongById from "@/hooks/useGetSongById";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed px-4 rounded-md py-2 w-full bottom-0 h-[80px] bg-bgColor">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;
