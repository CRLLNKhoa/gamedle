"use client";
import React, { useEffect, useState } from "react";
import Screen from "./components/screen";
import Form from "./components/Form";
import Timenewgame from "./components/timenewgame";
import { getGame } from "@/actions/guess-the-game";
import { useGTGStore } from "@/stores/useGTGStore";
import Loading from "./components/Loading";
import GameFinish from "./components/gameFinish";

export default function Page() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const game = useGTGStore((state: any) => state.game);
  const setGame = useGTGStore((state: any) => state.setGame);
  const setCurrHint = useGTGStore((state: any) => state.setCurrHint);
  const gameplayed = useGTGStore((state: any) => state.gameplayed);
  const setGamePlayed = useGTGStore((state: any) => state.setGamePlayed);

  useEffect(() => {
    const storedPlayed = localStorage.getItem("gamedle-data-guess-the-game-played");
    if (storedPlayed) {
      setGamePlayed(JSON.parse(storedPlayed));
    }
  }, []);


  const handleGetGame = async () => {
    // Ngày hiện tại
    const homNay: Date = new Date();
    // Ngày cụ thể bạn muốn tính đến
    const ngayCuThe: Date = new Date("2024-03-22"); // Thay '2024-03-30' bằng ngày bạn muốn
    // Tính số mili giây giữa hai ngày
    const soMiligiay: number = homNay.getTime() - ngayCuThe.getTime();
    // Chuyển đổi số mili giây thành số ngày
    const soNgay: number = Math.ceil(soMiligiay / (1000 * 60 * 60 * 24));
    const game = await getGame(soNgay);
    setGame(game?.data[0]);
    setCurrHint(game?.data[0]?.hints[0]);
  };

  useEffect(() => {
    setIsClient(true);
    handleGetGame();
  }, []);

  return (
    <main className="flex flex-col container flex-1 max-w-lg py-4">
      {game ? (
        <Screen />
      ) : (
        <Loading />
      )}
      <Form />
      {gameplayed.includes(game?.id) && <GameFinish />}
      {isClient && <Timenewgame />}
    </main>
  );
}
