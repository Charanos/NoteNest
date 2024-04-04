"use client";

import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UseAuthModal from "@/hooks/UseAuthModal";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const { user } = useUser();
  const router = useRouter();
  const authModal = UseAuthModal();
  const [isLiked, setIsLiked] = useState(false);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, user?.id, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }

    router.refresh();
  };

  return (
    <button onClick={handleLike} className="hover:opacity-70 transition">
      <Icon color={isLiked ? "#C850F2" : "#E2F3F5"} size={20} />
    </button>
  );
};

export default LikeButton;
