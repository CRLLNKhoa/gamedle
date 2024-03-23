import { Button } from "@/components/ui/button";
import { useGTGStore } from "@/stores/useGTGStore";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { useCopyToClipboard } from "usehooks-ts";
import { MdReplay } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Game from "./game";

const data = [
  { score: 10, name: 1 },
  { score: 21, name: 2 },
  { score: 34, name: 3 },
  { score: 23, name: 4 },
  { score: 56, name: 5 },
  { score: 72, name: 6 },
];

// Ngày hiện tại
const homNay: Date = new Date();
// Ngày cụ thể bạn muốn tính đến
const ngayCuThe: Date = new Date("2024-03-22"); // Thay '2024-03-30' bằng ngày bạn muốn
// Tính số mili giây giữa hai ngày
const soMiligiay: number = homNay.getTime() - ngayCuThe.getTime();
// Chuyển đổi số mili giây thành số ngày
const soNgay: number = Math.ceil(soMiligiay / (1000 * 60 * 60 * 24));

export default function GameFinish(_props: { id: string }) {
  const trans = useTranslations("gamefinish");
  const game = useGTGStore((state: any) => state.game);
  const gameplayed = useGTGStore((state: any) => state.gameplayed);
  const [result, setResult] = useState<any>({});
  const [copiedText, copy] = useCopyToClipboard();

  useEffect(() => {
    const storedResult = localStorage.getItem(
      `gamedle-data-guess-the-game-played-result-id:${_props.id}`
    );
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, [_props.id, gameplayed]);


  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl mb-4 text-center">
        {trans("title")} <b className="text-green-600">{game?.answer}</b>
      </h1>
      <Button
        className="bg-green-600 hover:bg-green-700 duration-500 text-md"
        size={"lg"}
        onClick={handleCopy(`#Gamedle - GuessTheGame #${game?.id} 🎮 ${result?.list_ans?.length}🟥   ${6 - result?.list_ans?.length}🟩    https://gamesdle.vercel.app/guess-the-game?id=${game?.id}`)}
      >
        <FaShareAlt className="mr-2 w-4 h-4" /> {copiedText ? trans("titlebuttoncopied") : trans("titlebutton")}
      </Button>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{trans("titleshow")}</AccordionTrigger>
          <AccordionContent>
          <div className="flex flex-col gap-2">
            {result?.list_ans?.map((_:any,index:number) => (
              <Button key={index} variant={"outline"} disabled className="">❌ {_}</Button>
            ))}
          </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex mt-4 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <MdReplay className="w-4 h-4 mr-2" />
              {trans("titleplay")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Chơi những ngày trước</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap items-center max-h-[200px] gap-2 overflow-y-auto w-full">
              {Array.from({ length: soNgay }, (_, index) => index).map((_,index) => (
                <Game id={String(index + 1)} />
              ))}
            </div>
            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FaChartSimple className="w-4 h-4 mr-2" />
              {trans("titlechart")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Game #679 Statistics</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 h-[200px] w-full">
              <ResponsiveContainer>
                <BarChart data={data}>
                  <Bar
                    dataKey="score"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <DialogFooter className="justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
