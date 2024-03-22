import React from "react";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Page() {
  const trans = useTranslations("about");
  return (
    <div className="flex flex-col mb-auto container flex-1 max-w-lg ">
      <h1 className="font-bold text-xl mb-4 mt-2">{trans("title")}</h1>
      <p>{trans("line1")}</p>
      <p>{trans("line2")}</p>
      <p>{trans("line3")}</p>
      <p>{trans("line4")}</p>
      <div className="flex mt-4 gap-4 justify-end items-center ">
        <a
          href="https://discord.gg/DFEMK42hx6"
          target="_blank"
          className="flex gap-2 rounded-md border p-2 bg-indigo-600 text-white hover:scale-110 duration-500"
        >
          <FaDiscord className="w-6 h-6" /> Discord
        </a>
        <a
          href="https://www.facebook.com/lnkhoa1205/"
          target="_blank"
          className="flex gap-2 rounded-md border p-2 bg-sky-600 text-white hover:scale-110 duration-500"
        >
          <FaFacebookSquare className="w-6 h-6" /> Facebook
        </a>
        <a
          href="https://github.com/CRLLNKhoa"
          target="_blank"
          className="flex gap-2 rounded-md border p-2 bg-stone-900 text-white hover:scale-110 duration-500"
        >
          <FaGithub className="w-6 h-6" /> Github
        </a>
      </div>
    </div>
  );
}
