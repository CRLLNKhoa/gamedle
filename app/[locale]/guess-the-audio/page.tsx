"use client";
import React from "react";
import HeaderGame from "./components/HeaderGame";
import Screen from "./components/screen";

export default function page() {
  return (
    <main className="flex flex-col container flex-1 max-w-lg py-4">
      <HeaderGame />
      <h1 className="text-center">Đang xây dựng</h1>
      {/* <Screen /> */}
    </main>
  );
}
