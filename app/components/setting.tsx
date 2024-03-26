"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoSettingsOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { useTheme } from "next-themes";


export default function Setting() {
  const [isClient, setIsClient] = useState(false);
  const trans = useTranslations("setting");
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme,theme } = useTheme();

  useEffect(() => {
    setIsClient(true)
  }, [])
  

  const handleChangeLanguage = (language: string) => {
    router.push(`/${language + pathname.slice(3)}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <IoSettingsOutline className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{trans("title")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1>{trans('titleLanguage')}: </h1>
            <div className="flex items-center gap-4">
              <Button
                size={"sm"}
                variant={
                  pathname.slice(1, 3) === "vi" ? "destructive" : "outline"
                }
                onClick={() => handleChangeLanguage("vi")}
              >
                Việt Nam
              </Button>
              <Button
                size={"sm"}
                variant={
                  pathname.slice(1, 3) === "en" ? "destructive" : "outline"
                }
                onClick={() => handleChangeLanguage("en")}
              >
                English
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h1>{trans("titleTheme")}: </h1>
            {isClient &&  <div className="flex items-center gap-4">
              <Button
                size={"icon"}
                onClick={() => setTheme("light")}
                variant={theme === "light" ? "default" : "outline"}
              >
                <IoMdSunny className="w-4 h-4" />
              </Button>
              <Button
                size={"icon"}
                onClick={() => setTheme("dark")}
                variant={theme === "dark" ? "default" : "outline"}
              >
                <IoMoon className="w-4 h-4" />
              </Button>
            </div>}
          </div>
          <p className="ml-auto">{trans("version")}: 1.0.2</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
