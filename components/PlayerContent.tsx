"use client";

import Slider from "./Slider";
import { Song } from "@/types";
// @ts-ignore
import useSound from "use-sound";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden w-full justify-end items-center col-auto">
        <div
          onClick={handlePlay}
          className="p-1 h-10 w-10 grid place-items-center rounded-full bg-textColor cursor-pointer"
        >
          <Icon className="text-primaryColor" size={25} />
        </div>
      </div>

      <div className="hidden h-full w-full md:flex justify-center items-center gap-x-5 max-w-[722px]">
        <AiFillStepBackward
          size={25}
          onClick={onPlayPrevious}
          className="transition text-textColor/60 cursor-pointer hover:text-textColor"
        />

        <div
          onClick={handlePlay}
          className="flex rounded-full h-10 w-10 p-1 justify-center relative items-center bg-textColor cursor-pointer"
        >
          <Icon size={30} className="text-primaryColor " />
        </div>

        <AiFillStepForward
          size={25}
          onClick={onPlayNext}
          className="transition text-textColor/60 cursor-pointer hover:text-textColor"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={25}
            onClick={toggleMute}
            className="cursor-pointer text-textColor"
          />

          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
