"use client";
import Link from "next/link";
import React from "react";
import { BarChart, Bar, XAxis,YAxis,ResponsiveContainer } from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function DashboardGTG() {
  return (
    <div className="border p-4 rounded-md flex flex-col">
      <div className="font-bold text-xl pb-1 mb-4 flex justify-between items-center border-b">
        <h1>Thống kê Guess The Game</h1>
        <Link href={"/admin/guess-the-game"} className="text-sm underline">Xem chi tiết</Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex border text-black p-2 rounded-lg">
                <h1>Tổng câu hỏi:</h1>
            </div>
            <div className="flex border text-black p-2 rounded-lg">
                <h1>Tổng lượt chơi:</h1>
            </div>
            <div className="flex border text-black p-2 rounded-lg">
                <h1>Lượt thắng:</h1>
            </div>
            <div className="flex border text-black p-2 rounded-lg">
                <h1>Lượt thua:</h1>
            </div>
          </div>
          <div className="w-full h-[240px] col-span-2 ml-2 border-l">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data}>
                  <Bar dataKey="uv" />
                  <XAxis dataKey="name"/>
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
}
