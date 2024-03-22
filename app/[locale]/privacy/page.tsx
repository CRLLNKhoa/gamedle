import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const trans = useTranslations("privacy");
  return (
    <div className="container flex-1 max-w-3xl mb-auto">
      <h1 className="font-bold text-xl mt-2 mb-4">Privacy</h1>
      <div dangerouslySetInnerHTML={{ __html: trans.raw("content") }}></div>
    </div>
  );
}
