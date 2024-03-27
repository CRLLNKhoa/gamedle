import { Button } from "@/components/ui/button";
import { useGTBStore } from "@/stores/useGTBStore";
import React, { useEffect, useState } from "react";
import { PiCaretDoubleRightFill } from "react-icons/pi";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function ListHint() {
  const game = useGTBStore((state: any) => state.game);
  const setCurrHint = useGTBStore((state: any) => state.setCurrHint);
  const currHint = useGTBStore((state: any) => state.currHint);
  const hintUnlock = useGTBStore((state: any) => state.hintUnlock)
  const setHintUnlock = useGTBStore((state: any) => state.setHintUnlock)
  const gameplayed = useGTBStore((state: any) => state.gameplayed);
  const listAns = useGTBStore((state: any) => state.listAns);
  const setListAns = useGTBStore((state: any) => state.setListAns);
  const setGamePlayed = useGTBStore((state: any) => state.setGamePlayed);

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
      setCurrHint(game?.hints[5]);
      localStorage.setItem(
        "gamedle-data-guess-the-book-played",
        JSON.stringify([...gameplayed, game?.id])
      );
      localStorage.setItem(
        `gamedle-data-guess-the-book-played-result-id:${game?.id}`,
        JSON.stringify({list_ans: listAns,hint_unlock: hintUnlock})
      );
    }
  }, [hintUnlock, listAns]);

  return (
    <div className="flex py-4 items-center justify-between">
      {gameplayed.includes(game?.id) ? (
        <div className="flex gap-2 items-center justify-center w-full">
          {game?.hints?.map((hint: any) => (
            <Button
              key={hint?.step}
              onClick={() => {
                setCurrHint(hint);
              }}
              variant={
                currHint?.step === hint?.step ? "destructive" : "default"
              }
              size={"icon"}
            >
              {hint?.step}
            </Button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center lg:justify-between w-full gap-y-2">
          <div className="flex gap-2">
            {game?.hints?.map((hint: any) => (
              <Button
                key={hint?.step}
                onClick={() => {
                  setCurrHint(hint);
                }}
                variant={
                  currHint?.step === hint?.step ? "destructive" : "default"
                }
                disabled={hint?.step > hintUnlock}
                size={"icon"}
              >
                {hint?.step}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => {
              setListAns([...listAns, "Skipped!"]),
                setHintUnlock(hintUnlock + 1),
                setCurrHint(game.hints[hintUnlock]);
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
