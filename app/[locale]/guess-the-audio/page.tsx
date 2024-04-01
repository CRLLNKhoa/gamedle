"use client";
import React, { useEffect, useState } from "react";
import HeaderGame from "./components/HeaderGame";
import Screen from "./components/screen";
import Timenewgame from "./components/timenewgame";
import { useSearchParams } from "next/navigation";
import { useGTAStore } from "@/stores/useGTAStore";
import { getGame } from "@/actions/guess-the-audio";
import Form from "./components/Form";
import GameFinish from "./components/gameFinish";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isClient, setIsClient] = useState<boolean>(false);
  const game = useGTAStore((state: any) => state.game);
  const setGame = useGTAStore((state: any) => state.setGame);
  const setCurrHint = useGTAStore((state: any) => state.setCurrHint);
  const gameplayed = useGTAStore((state: any) => state.gameplayed);
  const setGamePlayed = useGTAStore((state: any) => state.setGamePlayed);
  useEffect(() => {
    const storedPlayed = localStorage.getItem(
      "gamedle-data-guess-the-audio-played"
    );
    if (storedPlayed) {
      setGamePlayed(JSON.parse(storedPlayed));
    }
  }, []);

  const handleGetGame = async () => {
    // Ngày hiện tại
    const homNay: Date = new Date();
    // Ngày cụ thể bạn muốn tính đến
    const ngayCuThe: Date = new Date("2024-04-01"); // Thay '2024-03-30' bằng ngày bạn muốn
    // Tính số mili giây giữa hai ngày
    const soMiligiay: number = homNay.getTime() - ngayCuThe.getTime();
    // Chuyển đổi số mili giây thành số ngày
    const soNgay: number = Math.ceil(soMiligiay / (1000 * 60 * 60 * 24));
    if (id === null) {
      const game = await getGame(soNgay);
      setGame(game?.data[0]);
    } else {
      const game = await getGame(Number(id));
      setGame(game?.data[0]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    handleGetGame();
  }, [id]);

  return (
    <main className="flex flex-col container flex-1 max-w-lg py-4">
      <HeaderGame />
      <Screen />
      {!gameplayed.includes(game?.id) &&  <Form />}
      {gameplayed.includes(game?.id) && <GameFinish id={game?.id} />}
      {isClient && <Timenewgame />}
    </main>
  );
}
