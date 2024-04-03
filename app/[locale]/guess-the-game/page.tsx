"use client";
import React, { useEffect, useState } from "react";
import Screen from "./components/screen";
import Form from "./components/Form";
import Timenewgame from "./components/timenewgame";
import { getGame } from "@/actions/guess-the-game";
import { useGTGStore } from "@/stores/useGTGStore";
import Loading from "./components/Loading";
import GameFinish from "./components/gameFinish";
import { useSearchParams } from "next/navigation";
import HeaderGame from "./components/HeaderGame";
import AdBanner from "@/components/AdBanner";

export default function Page() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
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
    const ngayCuThe: Date = new Date("2024-04-01"); // Thay '2024-03-30' bằng ngày bạn muốn
    // Tính số mili giây giữa hai ngày
    const soMiligiay: number = homNay.getTime() - ngayCuThe.getTime();
    // Chuyển đổi số mili giây thành số ngày
    const soNgay: number = Math.ceil(soMiligiay / (1000 * 60 * 60 * 24));
    if(id === null){
      const game = await getGame(soNgay);
    setGame(game?.data[0]);
    setCurrHint(game?.data[0]?.hints[0]);
    }else {
      const game = await getGame(Number(id));
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
      <AdBanner
          data-ad-slot="8056880929"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      <HeaderGame />
      {game ? (
        <Screen />
      ) : (
        <Loading />
      )}
       {!gameplayed.includes(game?.id) &&  <Form />}
      {gameplayed.includes(game?.id) && <GameFinish id={game?.id} />}
      <AdBanner
          data-ad-slot="8056880929"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      {isClient && <Timenewgame />}
      <AdBanner
          data-ad-slot="8056880929"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
    </main>
  );
}
