import { Button } from "@/components/ui/button";
import { useGTAStore } from "@/stores/useGTAStore";
import React, { useEffect, useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import useSound from "use-sound";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-circular-progressbar/dist/styles.css";
import { FaPause } from "react-icons/fa6";
import {motion} from "framer-motion"

export default function SoundUI() {
  const [isLoading,setIsLoading] = useState(true)
  const game = useGTAStore((state: any) => state.game);
  const isPlaying = useGTAStore((state: any) => state.isPlaying);
  const currHint = useGTAStore((state: any) => state.currHint);
  const setIsPlaying = useGTAStore((state: any) => state.setIsPlaying);

  const container = {
    hidden: { opacity: 1},
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const [play, { stop }] = useSound(game?.link_audio, {
    sprite: {
      hint1: [0, 2000],
      hint2: [0, 4000],
      hint3: [0, 6000],
      hint4: [0, 8000],
      hint5: [0, 10000],
      hint6: [0, 15000],
    },
  });

  const handlePlay = (id: string, time: number) => {
    setIsPlaying();
    play({ id: id });
    setTimeout(
      () => {
        setIsPlaying();
      },
      time === 12000 ? 15000 : time
    );
  };

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    handlePlay(`hint${currHint.hint}`, currHint.time)
  }, [currHint])
  
  if(isLoading){
    return  <div className="flex items-center justify-center border p-2 rounded-xl gap-4 bg-[#282828] animate-pulse text-white ">
      <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />Đang tải âm thanh...
    </div>
  }

  return (
    <motion.div
    variants={container}
    initial="hidden"
    animate="visible"
>  <div className="flex flex-col border p-2 rounded-xl gap-4 bg-[#282828]">
      <div className="flex items-end gap-2 text-white flex-1">
        <motion.div variants={item}
          className="w-24 h-24 bg-white rounded-lg flex 
        items-center justify-center text-3xl select-none text-black"
        >
          ?
        </motion.div>
        <div className="flex flex-col">
          <h1 className="line-clamp-2 leading-4 mb-1">Guess The Audio</h1>
          <motion.p variants={item} className="flex items-center gap-2 text-xs">
            Genre:{" "}
            {currHint?.hint > 3 ? (
              <b className="line-clamp-1">{game?.info.genre}</b>
            ) : (
              <b className="line-clamp-1">____________</b>
            )}
          </motion.p>
          <motion.p variants={item} className="flex items-center gap-2 text-xs">
            Album:{" "}
            {currHint?.hint > 4 ? (
              <b className="line-clamp-1">
                {game?.info.album}
              </b>
            ) : (
              <b className="line-clamp-1">____________</b>
            )}
          </motion.p>
          <motion.p variants={item} className="flex items-center gap-2 text-xs">
            Artist:{" "}
            {currHint?.hint > 5 ? (
              <b className="line-clamp-1">{game?.info?.artist}</b>
            ) : (
              <b className="line-clamp-1">____________</b>
            )}
          </motion.p>
        </div>
      </div>
      <div className="flex justify-between items-center text-white pr-2 pb-2">
        <div className="flex items-center justify-between gap-4">
          <motion.div variants={item} className="flex items-center">
            <IoIosTime className="mr-2 w-4 h-4" />
            {currHint?.hint > 1 ? <p>{game?.info?.length}</p> : <p>____</p>}
          </motion.div>
          <motion.p variants={item} className="flex items-center gap-2 text-sm">
            Release Year: {currHint?.hint > 2 ? <b>{game?.info.release_year}</b> : <b>____</b>}
          </motion.p>
        </div>
        {isPlaying ? (
          <Button
            onClick={() => {
              stop()
              setIsPlaying()
            }}
            size={"icon"}
            className="rounded-full bg-white hover:bg-white text-black 
          w-7 h-7 flex items-center justify-center"
          >
            <FaPause className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            size={"icon"}
            className="rounded-full bg-white hover:bg-white text-black 
          w-7 h-7 flex items-center justify-center"
            onClick={() => handlePlay(`hint${currHint.hint}`, currHint.time)}
          >
            <BsPlayFill className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div></motion.div>
  
  );
}
