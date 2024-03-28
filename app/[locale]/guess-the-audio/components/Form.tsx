"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dataSearch from "@/jsons/audio-name.json";
import _ from "lodash";
import { VscArrowSmallRight } from "react-icons/vsc";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useGTAStore } from "@/stores/useGTAStore";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Confetti from "react-confetti";

export default function Form() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const game = useGTAStore((state: any) => state.game);
  const listAns = useGTAStore((state: any) => state.listAns);
  const setListAns = useGTAStore((state: any) => state.setListAns);
  const [showConfetti,setShowConfetti] = useState(false)
  const setGamePlayed = useGTAStore((state: any) => state.setGamePlayed);
  const gameplayed = useGTAStore((state: any) => state.gameplayed);
  const setHintUnlock = useGTAStore((state: any) => state.setHintUnlock)
  const setCurrHint = useGTAStore((state: any) => state.setCurrHint);
  const hintUnlock = useGTAStore((state: any) => state.hintUnlock)
  const setStart = useGTAStore((state: any) => state.setStart)

  useEffect(() => {
    const debouncedSearch = _.debounce((value) => {
      const trimmedValue = value.trim(); // Loại bỏ khoảng trắng đầu tiên
      const results = dataSearch.filter((item) =>
        item.toLowerCase().includes(trimmedValue.toLowerCase())
      );
      setSearchResults(results);
    }, 300);

    debouncedSearch(searchTerm);

    return () => {
      debouncedSearch.cancel(); // Hủy debounce nếu component bị unmounted
    };
  }, [searchTerm, dataSearch]);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Thiết lập một timeout để thay đổi trạng thái sau 1 giây
    const timeout = setTimeout(() => {
      setShowConfetti(false); // Đặt trạng thái thành false
    }, 5000);
    // Hủy timeout khi component unmount
    return () => clearTimeout(timeout);
  }, [showConfetti]);

  const handleCheck = () => {
    if (searchTerm !== "") {
      if (game?.answer === searchTerm) {
        Swal.fire({
          title: "Correct !",
          text: `The answer was: ${game?.answer}`,
          icon: "success",
          confirmButtonText: "Quay lại",
        });
        setGamePlayed([...gameplayed, game?.id])
        setShowConfetti(true)
        localStorage.setItem(
          "gamedle-data-guess-the-audio-played",
          JSON.stringify([...gameplayed, game?.id])
        );
        localStorage.setItem(
          `gamedle-data-guess-the-audio-played-result-id:${game?.id}`,
          JSON.stringify({list_ans: listAns,hint_unlock: listAns?.length})
        );
        setStart()
      } else {
        Swal.fire({
          title: "Chưa đúng!",
          text: "Hãy mở thêm gợi ý!",
          icon: "error",
          confirmButtonText: "Quay lại",
        });
        setListAns([...listAns, searchTerm]);
        setHintUnlock(hintUnlock + 1),
        setCurrHint({
          hint: hintUnlock + 1,
          time: hintUnlock === 6 ? 15000 : (hintUnlock + 1) * 2000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {showConfetti && <Confetti className="w-full h-full fixed" />}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full">
            {searchTerm !== "" ? searchTerm : "Tìm kiếm một bài hát..."}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <div className="p-4 pb-0">
              <Input
                placeholder="Nhập tên bài hát..."
                value={searchTerm}
                onChange={handleChange}
              />

              <div className="flex flex-col my-2 border p-2 rounded-lg">
                <h2 className="font-bold">Kết quả ({searchResults.length})</h2>
                <ul className="h-[140px] pr-2 overflow-y-auto transition-all duration-500">
                  {searchResults.map((item) => (
                    <li
                      className="cursor-pointer line-clamp-1 flex items-center gap-2 hover:bg-sky-600/60"
                      key={item}
                      onClick={() => setSearchTerm(item)}
                    >
                      <VscArrowSmallRight />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="max-w-[240px] mx-auto">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <Button onClick={handleCheck} className="min-w-[240px] duration-500">
        <FaRegCircleCheck className="w-4 h-4 mr-2" /> Kiểm tra
      </Button>
      <div className="flex flex-col gap-2 w-full">
        {listAns.map((_:any,index:number) => (
          <Button
            key={index}
            disabled
            variant={"outline"}
            className="line-clamp-1 select-none"
          >
            ❌ {_}{" "}
          </Button>
        ))}
      </div>
    </div>
  );
}
