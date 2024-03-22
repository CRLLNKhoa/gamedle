import { Button } from "@/components/ui/button";
import { useGTGStore } from "@/stores/useGTGStore";
import React, { useEffect, useState } from "react";
import { PiCaretDoubleRightFill } from "react-icons/pi";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function ListHint() {
  const game = useGTGStore((state: any) => state.game);
  const setCurrHint = useGTGStore((state: any) => state.setCurrHint);
  const currHint = useGTGStore((state: any) => state.currHint);
  const [hintUnlock, setHintUnlock] = useState<number>(1);
  const gameplayed = useGTGStore((state: any) => state.gameplayed);

  useEffect(() => {
    const messageLose = () => {
      Swal.fire({
        title: "Oh no! Better luck next time!",
        text: "The answer was: The Forgotten City",
        icon: "error",
        confirmButtonText: "Close",
      });
    };
    if (hintUnlock > 6) {
      messageLose();
    }
  }, [hintUnlock]);

  return (
    <div className="flex py-4 items-center justify-between">
      {gameplayed.includes(game?.id) ? (
        <div className="flex gap-2 items-center justify-center w-full">
          {game?.hints?.map((hint: any) => (
            <Button
              onClick={() => {
                setCurrHint(hint);
              }}
              variant={currHint.step === hint?.step ? "destructive" : "default"}
              size={"icon"}
            >
              {hint?.step}
            </Button>
          ))}
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            {game?.hints?.map((hint: any) => (
              <Button
                onClick={() => {
                  setCurrHint(hint);
                }}
                variant={
                  currHint.step === hint?.step ? "destructive" : "default"
                }
                disabled={hint?.step > hintUnlock}
                size={"icon"}
              >
                {hint?.step}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => setHintUnlock(hintUnlock + 1)}
            className="flex items-center bg-green-600 hover:bg-green-700 duration-500"
          >
            Bỏ qua <PiCaretDoubleRightFill className="w-4 h-4 ml-2" />
          </Button>
        </>
      )}
    </div>
  );
}
