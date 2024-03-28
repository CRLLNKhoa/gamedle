import { Button } from "@/components/ui/button";
import { useGTAStore } from "@/stores/useGTAStore";
import React, { useEffect, useState } from "react";
import { PiCaretDoubleRightFill } from "react-icons/pi";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function ListHint() {
  const game = useGTAStore((state: any) => state.game);
  const setCurrHint = useGTAStore((state: any) => state.setCurrHint);
  const gameplayed = useGTAStore((state: any) => state.gameplayed);
  const listAns = useGTAStore((state: any) => state.listAns);
  const setListAns = useGTAStore((state: any) => state.setListAns);
  const setGamePlayed = useGTAStore((state: any) => state.setGamePlayed);
  const hintUnlock = useGTAStore((state: any) => state.hintUnlock);
  const setHintUnlock = useGTAStore((state: any) => state.setHintUnlock);
  const setStart = useGTAStore((state: any) => state.setStart);
  console.log(game);
  useEffect(() => {
    const messageLose = () => {
      Swal.fire({
        title: "Oh no! Better luck next time!",
        text: `The answer was: ${game?.answer}`,
        icon: "error",
        confirmButtonText: "Close",
      });
    };
    if (hintUnlock > 6 || listAns?.length === 6) {
      messageLose();
      setGamePlayed([...gameplayed, game?.id]);
      setCurrHint({
        hint: hintUnlock + 1,
        time: hintUnlock === 6 ? 15000 : (hintUnlock + 1) * 2000,
      });
      localStorage.setItem(
        "gamedle-data-guess-the-audio-played",
        JSON.stringify([...gameplayed, game?.id])
      );
      localStorage.setItem(
        `gamedle-data-guess-the-game-audio-result-id:${game?.id}`,
        JSON.stringify({ list_ans: listAns, hint_unlock: hintUnlock })
      );
      setStart();
    }
  }, [hintUnlock, listAns]);

  return (
    <div className="flex py-4 items-center justify-between">
      {!gameplayed.includes(game?.id) && (
        <div className="flex flex-wrap items-center justify-center lg:justify-between w-full gap-y-2">
          <div className="flex gap-2">
            {Array.from({ length: 6 }, (_, index) => index + 1).map((i) => (
              <Button
                key={i}
                size={"icon"}
                variant={hintUnlock >= i ? "default" : "outline"}
              >
                {i}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => {
              setListAns([...listAns, "Skipped!"]),
                setHintUnlock(hintUnlock + 1),
                setCurrHint({
                  hint: hintUnlock + 1,
                  time: hintUnlock === 6 ? 15000 : (hintUnlock + 1) * 2000,
                });
            }}
            className="flex items-center bg-green-600 hover:bg-green-700 duration-500"
          >
            Bỏ qua <PiCaretDoubleRightFill className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
