import { Link } from "@/navigation";
import React, { useEffect, useState } from "react";

export default function Game(_props: { id: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const storedResult = localStorage.getItem(
      `gamedle-data-guess-the-audio-played-result-id:${_props.id}`
    );
    if (storedResult) {
      setData(JSON.parse(storedResult));
    }
  }, [_props.id]);
  return (
    <Link href={`/guess-the-game?id=${_props.id}`} className="w-full flex items-center lg:justify-between cursor-pointer hover:bg-black/20 mr-2 py-1 px-2 duration-500 rounded-md">
      <h1 className="bg-sky-600 text-white px-2 text-sm font-bold rounded-md">Game {_props.id}</h1>
      {data !== null && (
        <div className="flex flex-1 justify-center items-center">
          <p>
            {Array.from({ length: data?.list_ans?.length }, (_, index) => "🟥")}{" "}
          </p>
          <p>
            {Array.from(
              { length: 6 - data?.list_ans?.length },
              (_, index) => "🟩"
            )}{" "}
          </p>
        </div>
      )}
      {data === null && (
        <div className="flex gap-1 flex-1 justify-center">
          <div className="border text-xs">❓</div>
          <div className="border text-xs">❓</div>
          <div className="border text-xs">❓</div> 
          <div className="border text-xs">❓</div>
          <div className="border text-xs">❓</div>
          <div className="border text-xs">❓</div>
        </div>
      )}
      {data === null && (
        <div className="hidden lg:block">⌛Chưa chơi🚨</div>
      )}
      {(data !== null && data?.list_ans?.length >= 6) && (
        <div className="hidden lg:block">😭Đã thua😞</div>
      )}
        {(data !== null && data?.list_ans?.length < 6) && (
        <div className="hidden lg:block">🏆Đã thắng🔥</div>
      )}
    </Link>
  );
}
