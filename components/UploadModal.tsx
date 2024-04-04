"use client";

import Modal from "./Modal";
import uniqid from "uniqid";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import useUploadModal from "@/hooks/useUploadModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

const UploadModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      artist: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();

      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!songFile || !imageFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueId = uniqid();

      // upload song to db
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          upsert: false,
          cacheControl: "3600",
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload!");
      }

      // upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            upsert: false,
            cacheControl: "3600",
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload!");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          artist: values.artist,
          song_path: songData.path,
          image_path: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Successfully uploaded new song");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onChange={onChange}
      title="add a song"
      isOpen={uploadModal.isOpen}
      description="upload a mp3 file"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song Title"
          {...register("title", { required: true })}
        />

        <Input
          id="artist"
          disabled={isLoading}
          placeholder="Song artist"
          {...register("artist", { required: true })}
        />

        <div>
          <div className="pb-2">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <div className="pb-2">Select a song image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-5 hover:scale-100"
        >
          Upload
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
