import { Button } from "@/components/ui/button";
import { useGTAStore } from "@/stores/useGTAStore";
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
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Game from "./game";
import { getChart } from "@/actions/guess-the-audio";
import { useSearchParams } from "next/navigation";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";


// Ngày hiện tại
const homNay: Date = new Date();
// Ngày cụ thể bạn muốn tính đến
const ngayCuThe: Date = new Date("2024-04-01"); // Thay '2024-03-30' bằng ngày bạn muốn
// Tính số mili giây giữa hai ngày
const soMiligiay: number = homNay.getTime() - ngayCuThe.getTime();
// Chuyển đổi số mili giây thành số ngày
const soNgay: number = Math.ceil(soMiligiay / (1000 * 60 * 60 * 24));

export default function GameFinish(_props: { id: string }) {
  const trans = useTranslations("gamefinish");
  const game = useGTAStore((state: any) => state.game);
  const gameplayed = useGTAStore((state: any) => state.gameplayed);
  const [result, setResult] = useState<any>({});
  const [copiedText, copy] = useCopyToClipboard();

  useEffect(() => {
    const storedResult = localStorage.getItem(
      `gamedle-data-guess-the-audio-result-id:${_props.id}`
    );
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, [_props.id, gameplayed]);

  const [data, setData] = useState<any>([]);
  const [total,setTotal] = useState(0)
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  useEffect(() => {
    const get = async () => {
      const result = await getChart();
      if (result?.status === 200) {
        setData([
          { score: result?.data[0]?.hint1 + 10, name: "Hint 1" },
          { score: result?.data[0]?.hint2 + 10, name: "Hint 2" },
          { score: result?.data[0]?.hint3 + 10, name: "Hint 3" },
          { score: result?.data[0]?.hint4 + 10, name: "Hint 4" },
          { score: result?.data[0]?.hint5 + 10, name: "Hint 5" },
          { score: result?.data[0]?.hint6 + 10, name: "Hint 6" },
        ]);
        setTotal(result?.data[0]?.count_played + 60)
      }
    };
    get();
  }, [search]);

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
        onClick={handleCopy(
          `#Gamedle - GuessTheGame #${game?.id} 🎮 ${
            result?.list_ans?.length
          }🟥   ${
            6 - result?.list_ans?.length
          }🟩    https://gamedle.online/guess-the-audio?id=${game?.id}`
        )}
      >
        <FaShareAlt className="mr-2 w-4 h-4" />{" "}
        {copiedText ? trans("titlebuttoncopied") : trans("titlebutton")}
      </Button>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{trans("titleshow")}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {result?.list_ans?.map((_: any, index: number) => (
                <Button key={index} variant={"outline"} disabled className="">
                  ❌ {_}
                </Button>
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
              {Array.from({ length: soNgay }, (_, index) => index).map(
                (_, index) => (
                  <Game key={index} id={String(index + 1)} />
                )
              )}
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
              <DialogTitle>Game #{game?.id} Statistics</DialogTitle>
            </DialogHeader>
            <div className="flex items-center flex-col select-none gap-4 h-[240px] w-full pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  width={420}
                  height={420}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={data}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Mike"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#2ca02c"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center flex-wrap justify-between w-full">
                <h1>Thống kê (Tỉ lệ trả lời đúng ở từng số gợi ý):</h1>
                <div className="flex gap-4 flex-wrap items-center">
                  <p>1: <b>{Math.floor((data[0]?.score)/total*100)}%</b></p>
                  <p>2: <b>{Math.floor((data[1]?.score)/total*100)}%</b></p>
                  <p>3: <b>{Math.floor((data[2]?.score)/total*100)}%</b></p>
                  <p>4: <b>{Math.floor((data[3]?.score)/total*100)}%</b></p>
                  <p>5: <b>{Math.floor((data[4]?.score)/total*100)}%</b></p>
                  <p>6: <b>{Math.floor((data[5]?.score)/total*100)}%</b></p>
                </div>
              </div>
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
