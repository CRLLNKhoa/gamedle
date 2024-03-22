"use client";
import React from "react";
import { TbSquareRoundedLetterG } from "react-icons/tb";
import Link from "next/link";
import Setting from "./setting";

export default function Hearder() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95
         backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex justify-between items-center"
    >
      <Link href={"/"}>
        <h1 className="font-semibold text-lg flex items-center cursor-pointer hover:text-sky-600 duration-500">
          <TbSquareRoundedLetterG className="w-8 h-8" />
          amedle
        </h1>
      </Link>
      <Setting />
    </header>
  );
}
