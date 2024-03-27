"use client";
import React, { useEffect, useState } from "react";
import HeaderGame from "./components/HeaderGame";
import Screen from "./components/screen";
import Form from "./components/Form";
import { useSearchParams } from "next/navigation";
import { useGTBStore } from "@/stores/useGTBStore";
import { getGame } from "@/actions/guess-the-book";
import Loading from "../guess-the-game/components/Loading";
import Timenewgame from "./components/timenewgame";
import GameFinish from "./components/gameFinish";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isClient, setIsClient] = useState<boolean>(false);
  const game = useGTBStore((state: any) => state.game);
  const setGame = useGTBStore((state: any) => state.setGame);
  const setCurrHint = useGTBStore((state: any) => state.setCurrHint);
  const gameplayed = useGTBStore((state: any) => state.gameplayed);
  const setGamePlayed = useGTBStore((state: any) => state.setGamePlayed);

  useEffect(() => {
    const storedPlayed = localStorage.getItem(
      "gamedle-data-guess-the-book-played"
    );
    if (storedPlayed) {
      setGamePlayed(JSON.parse(storedPlayed));
    }
  }, []);

  const handleGetGame = async () => {
    // Ngày hiện tại
    const homNay: Date = new Date();
    // Ngày cụ thể bạn muốn tính đến
    const ngayCuThe: Date = new Date("2024-03-27"); // Thay '2024-03-30' bằng ngày bạn muốn
    // Tính số mili giây giữa hai ngày
    const soMiligiay: number = homNay.getTime() - ngayCuThe.getTime();
    // Chuyển đổi số mili giây thành số ngày
    const soNgay: number = Math.ceil(soMiligiay / (1000 * 60 * 60 * 24));
    if (id === null) {
      const game = await getGame(soNgay);
      console.log(game);
      setGame(game?.data[0]);
      setCurrHint(game?.data[0]?.hints[0]);
    } else {
      const game = await getGame(Number(id));
      console.log(game);
      setGame(game?.data[0]);
      setCurrHint(game?.data[0]?.hints[0]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    handleGetGame();
  }, [id]);

  return (
    <main className="flex flex-col container flex-1 max-w-lg py-4">
      <HeaderGame />
      {game ? <Screen /> : <Loading />}
      {!gameplayed.includes(game?.id) &&  <Form />}
      {gameplayed.includes(game?.id) && <GameFinish id={game?.id} />}
      {isClient && <Timenewgame />}
    </main>
  );
}
