import React from "react";
import { GoHeart } from "react-icons/go";
import { LuHelpCircle } from "react-icons/lu";
import { VscGame } from "react-icons/vsc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export default function HeaderGame() {
  const trans = useTranslations("support");
  return (
    <div className="flex items-center mb-4">
      <h1 className="font-bold text-xl flex items-center gap-2">
        <VscGame className="w-6 h-6" />
        Guess The Game
      </h1>
      <div className="flex items-center gap-4 ml-auto">
        <Dialog>
          <DialogTrigger asChild>
            <GoHeart className="w-[26px] h-[26px]" />
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h1 className="font-bold mb-2">{trans("title")}</h1>
                <p className="text-sm">
                  Tôi hy vọng bạn thích trò chơi giải đố hàng ngày này! Nếu điều
                  đó làm cho ngày của bạn tươi sáng hơn, cách tốt nhất bạn có
                  thể ủng hộ chúng tôi là chia sẻ trang web với bạn bè, đăng
                  điểm số hàng ngày của bạn trên reddit, discord hoặc trang web
                  yêu thích của bạn hoặc chia sẻ Gamedle với hãng tin tức yêu
                  thích của bạn!
                </p>
                <h1 className="font-bold my-2">Ủng hộ 1 ly trà đá</h1>
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
            <LuHelpCircle className="w-6 h-6" />
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-4"></div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
