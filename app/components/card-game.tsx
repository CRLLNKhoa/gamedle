import { Button } from "@/components/ui/button";
import React from "react";
import { GoHeart } from "react-icons/go";
import { FaRegComment, FaRegStar } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

export default function CardGame(_props: {
  title: string;
  mode: number;
  ques: number;
  href: string;
  img: string,
  textColor?: string
}) {
  const trans = useTranslations("card");
  return (
    <div className="border rounded-xl p-4 bg-foreground/60 flex flex-col">
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col">
          <Link href={_props.href} className={cn("text-white dark:text-black text-lg line-clamp-2 leading-6",_props.textColor)}>
            {_props.title}
          </Link>
          <p className="text-muted text-sm">Made by @CaroloKhoa</p>
        </div>
        <img
          src={_props.img}
          alt="gamedle-img"
          className="w-14 h-14 rounded-md"
        />
      </div>
      <div className="flex gap-2 justify-between items-center mt-2">
        <div className="flex items-center text-white dark:text-black gap-2 text-xs">
          <span className="flex items-center gap-1 border border-dashed rounded-full px-2 cursor-pointer">
          {_props.mode} <FaRegStar />
          </span>
          <span className="flex items-center gap-1 border border-dashed rounded-full px-2 cursor-pointer">
          {_props.ques} {trans("ques")}
          </span>
        </div>
        <Link href={_props.href} className="flex items-center justify-center text-white dark:text-black border px-2 rounded-md cursor-pointer text-sm py-1 hover:scale-105 duration-500">
          {trans("play")}
        </Link>
      </div>
    </div>
  );
}
