import React from "react";

export default function Hint(_props: {
  currHint: { text: string; hint: string };
}) {
  console.log(_props);
  return (
    <div className="flex flex-col items-start">
      {_props?.currHint?.hint !== "" && (
        <div className="bg-black text-white px-4 py-1 rounded-lg">
          <h1>{_props?.currHint?.hint}</h1>
        </div>
      )}

      <div className="max-h-[240px] overflow-y-auto my-4 text-md">
        "{_props?.currHint?.text}"
      </div>
    </div>
  );
}
