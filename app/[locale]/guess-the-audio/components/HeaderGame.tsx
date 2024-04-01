import React from "react";
import { GoHeart } from "react-icons/go";
import { LuHelpCircle } from "react-icons/lu";
import { RiMusic2Line } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export default function HeaderGame() {
  const trans = useTranslations("header");
  return (
    <div className="flex items-center mb-4">
      <h1 className="font-bold text-xl flex items-center gap-2">
        <RiMusic2Line className="w-6 h-6" />
        Guess The Audio
      </h1>
      <div className="flex items-center gap-4 ml-auto">
        <Dialog>
          <DialogTrigger asChild>
            <GoHeart className="w-[26px] h-[26px]" />
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h1 className="font-bold mb-2">{trans("title1")}</h1>
                <p className="text-sm">
                  {trans("content")}
                </p>
                <h1 className="font-bold my-2"> {trans("title2")}</h1>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src="/qr.png"
                    alt="MB:0336284229"
                    className="size-[200px]"
                  />
                  <p className="text-sm font-bold">LUONG NGUYEN KHOA</p>
                  <a
                    className="mt-2"
                    href="https://ko-fi.com/N4N8VYHGD"
                    target="_blank"
                  >
                    <img
                      height="36"
                      style={{ border: "0px", height: "36px" }}
                      src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
                      alt="Buy Me a Coffee at ko-fi.com"
                    />
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <LuHelpCircle className="w-6 h-6 cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
          <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl">Hướng dẫn</h1>
              <div className="flex flex-col gap-4">
                <p>Tìm kiếm âm thanh mà bạn nghĩ có âm thanh đó.</p>
                <p>Nếu bạn hiểu sai, chúng tôi sẽ tiết lộ thêm một chút âm thanh để giúp bạn.</p>
                <p>Bạn nhận được tổng cộng 6 lần đoán.</p>
                <p>Chúc may mắn!</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
