"use client";
import React from "react";
import ListHint from "./ListHint";
import SoundUI from "./SoundUI";
import { useGTAStore } from "@/stores/useGTAStore";
import { Button } from "@/components/ui/button";

export default function Screen() {
  const start = useGTAStore((state: any) => state.start);
  const game = useGTAStore((state: any) => state.game);
  const setStart = useGTAStore((state: any) => state.setStart);
  const gameplayed = useGTAStore((state: any) => state.gameplayed);
  return (
    <div className="flex flex-col w-full">
      <p className="text-center mb-2">Audio #{game?.id}</p>
      {gameplayed.includes(game?.id) && (
        <iframe
          src={game?.embed}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
      {(!gameplayed.includes(game?.id) && !start) && (
        <Button disabled={!game} onClick={() => setStart()} className="bg-green-600 hover:bg-green-600">{game ? "Bất đầu game" : "Loading"}</Button>
      )}
      {start && <SoundUI />}
      <ListHint />
    </div>
  );
}
