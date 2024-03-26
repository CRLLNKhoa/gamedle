"use client";
import { useCountdown } from "@/hooks/useCountDown";
import { useTranslations } from "next-intl";
import React from "react";

export default function Timenewgame() {
  const { hours, minutes, seconds } = useCountdown();
  const trans = useTranslations("countdown");
  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="font-bold text-md my-2">{trans("title")}</h1>
      <div className="flex items-center gap-2 text-white">
        <div className="flex bg-sky-600 p-2 w-[60px] justify-center items-center rounded-md font-bold">{hours} H</div>
        <div className="flex bg-sky-600 p-2 w-[60px] justify-center items-center rounded-md font-bold">{minutes} M</div>
        <div className="flex bg-sky-600 p-2 w-[60px] justify-center items-center rounded-md font-bold">{seconds} S</div>
      </div>
    </div>
  );
}
