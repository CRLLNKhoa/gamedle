"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useGTGAdminStore } from "@/stores/useGTGAdminStore";
import { getGames } from "@/actions/guess-the-game";
import { format } from "date-fns";
import { useCopyToClipboard } from "usehooks-ts";

export default function Listgame() {
  const list = useGTGAdminStore((state: any) => state.list);
  const setList = useGTGAdminStore((state: any) => state.setList);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState<any>(0);
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  const get = async () => {
    const result = await getGames(page, 8);
    console.log(result);
    setList(result?.data);
    setTotalPage(result?.totalPage);
  };

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    get();
  }, [list]);

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between pb-1 border-b">
        <h1 className="font-bold text-lg">Danh sách các game:</h1>
        <Button>Thêm Game</Button>
      </div>
      {list.length === 0 && (
        <div className="p-4 flex items-center justify-center">
          Đang lấy thông tin....
        </div>
      )}
      <div className="mt-4 flex flex-col gap-2">
        {list?.map((_: any) => (
          <div className="flex items-center justify-between border-b last:border-none pb-2">
            <h1>Game #{_.id}</h1>
            <p>{format(_?.created_at, "Pp")}</p>
            <div className="flex items-center gap-2">
              <Button
                onClick={() =>
                  handleCopy(
                    `https://gamesdle.vercel.app/${_.id} Gamedle - #GuessTheGame`
                  )
                }
                className="bg-sky-500 hover:bg-sky-600 duration-500"
                size={"icon"}
              >
                <IoCopyOutline className="w-4 h-4" />
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600 duration-500"
                size={"icon"}
              >
                <BiEdit className="w-4 h-4" />
              </Button>
              <Button size={"icon"} variant={"destructive"}>
                <AiOutlineDelete className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
