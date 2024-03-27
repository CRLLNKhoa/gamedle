import { Button } from "@/components/ui/button";
import React from "react";
import { CgMusicSpeaker } from "react-icons/cg";
import useSound from 'use-sound';

export default function SoundUI() {
    const [play] = useSound("/1.mp3", {
        volume: 0.5,
      });
  return (
    <div className="flex items-start border p-4 rounded-lg gap-4">
      <CgMusicSpeaker className="w-12 h-12" />
      <div className="flex flex-col flex-1">
        <h1 className="line-clamp-1 font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, quos
          cum ut quis sed cupiditate, accusamus placeat perferendis vitae
          voluptate dicta architecto minus quidem necessitatibus quae sint.
          Error, labore tenetur.
        </h1>
        <p>Tác giả:</p>
        <div className="flex items-center justify-between mt-2 gap-4">
          <Button className="flex-1">Thông tin âm thanh</Button>
          <Button className="w-24" onClick={play}>Phát</Button>
        </div>
      </div>
    </div>
  );
}
