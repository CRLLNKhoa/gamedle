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
import dataSearch from "@/jsons/games-name.json";
import _ from "lodash";
import { VscArrowSmallRight } from "react-icons/vsc";

export default function Form() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

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

  return (
    <div className="flex flex-col gap-2 items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full">
            Tìm kiếm một trò chơi...
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <div className="p-4 pb-0">
              <Input
                placeholder="Nhập tên game..."
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
      <Button className="min-w-[240px] bg-green-600 hover:bg-green-700 duration-500">
        Kiểm tra
      </Button>
      {/* <div className='flex flex-col gap-2 w-full'>
        <Input className='w-full' readOnly value={"❌Dreamer Series: Pop Star"} />
        <Input readOnly value={"❌Dreamer Series: Pop Star"} />
        <Input readOnly value={"❌Dreamer Series: Pop Star"} />
    </div> */}
    </div>
  );
}
