import { Song } from "@/types";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";
import UseAuthModal from "./UseAuthModal";

const useOnPlay = (songs: Song[]) => {
  const { user } = useUser();
  const player = usePlayer();
  const authModal = UseAuthModal();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
