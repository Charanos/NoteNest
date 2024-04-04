import { Song } from "@/types";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useGetSongById = (id?: string) => {
  const { supabaseClient } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ song, isLoading }), [song, isLoading]);
};

export default useGetSongById;