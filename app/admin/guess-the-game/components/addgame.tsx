"use client";
import { addGame } from "@/actions/guess-the-game";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGTGAdminStore } from "@/stores/useGTGAdminStore";
import React, { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function Addgame() {
    const list = useGTGAdminStore((state: any) => state.list);
    const setList = useGTGAdminStore((state: any) => state.setList);
  const [newGame, setNewGame] = useState({
    answer: "",
    id: "",
  });
  const [hint1, setHint1] = useState({
    step: 1,
    img: "https://picsum.photos/seed/picsum/200/300",
    hint: "",
  });
  const [hint2, setHint2] = useState({
    step: 2,
    img: "https://picsum.photos/seed/picsum/200/300",
    hint: "",
  });
  const [hint3, setHint3] = useState({
    step: 3,
    img: "https://picsum.photos/seed/picsum/200/300",
    hint: "",
  });
  const [hint4, setHint4] = useState({
    step: 4,
    img: "https://picsum.photos/seed/picsum/200/300",
    hint: "",
  });
  const [hint5, setHint5] = useState({
    step: 5,
    img: "https://picsum.photos/seed/picsum/200/300",
    hint: "",
  });
  const [hint6, setHint6] = useState({
    step: 6,
    img: "https://picsum.photos/seed/picsum/200/300",
    hint: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    const result = await addGame({
      id: newGame.id,
      answer: newGame.answer,
      hints: [hint1, hint2, hint3, hint4, hint5, hint6],
    });
    if (result?.status === 200) {
      Swal.fire({
        title: "Thêm thành công !",
        icon: "success",
      });
      setLoading(false);
      setList([...list, result.data[0]])
    }else {
        Swal.fire({
            title: "Không thành công !",
            icon: "error",
          });
          setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-md mb-4 border-b">Thêm game mới</h1>
      <div className="flex gap-4 items-center justify-center">
        <p>ID:</p>{" "}
        <Input
          type="number"
          value={newGame.id}
          onChange={(e) => setNewGame({ ...newGame, id: e.target.value })}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Đáp án:</p>{" "}
        <Input
          type="text"
          value={newGame.answer}
          onChange={(e) => setNewGame({ ...newGame, answer: e.target.value })}
        />
      </div>
      <div className="flex flex-col items-center justify-center border-b py-4 border-red-600 border-dashed">
        <p className="font-bold text-lg">Pic 1:</p>
        <div className="flex flex-col justify-between w-full gap-4 items-center">
          <div className="flex flex-col w-full">
            <h1>URL</h1>
            <Input
              value={hint1?.img}
              onChange={(e) => setHint1({ ...hint1, img: e.target.value })}
              placeholder="Liên kết..."
              type="text"
            />
          </div>
          <img
            className="rounded-lg h-[160px] w-1/2"
            src={hint1?.img}
            alt={hint1?.img}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b py-4 border-red-600 border-dashed">
        <p className="font-bold text-lg">Pic 2:</p>
        <div className="flex justify-between w-full gap-4 items-center">
          <div className="flex flex-col gap-2 w-full justify-between h-full">
            <div className="flex flex-col">
              <h1>URL</h1>{" "}
              <Input
                type="text"
                value={hint2?.img}
                onChange={(e) => setHint2({ ...hint2, img: e.target.value })}
                placeholder="Liên kết..."
              />
            </div>
            <div className="flex flex-col">
              <h1>Hint</h1>{" "}
              <Input
                type="text"
                value={hint2?.hint}
                onChange={(e) => setHint2({ ...hint2, hint: e.target.value })}
                placeholder="Gợi ý..."
              />
            </div>
          </div>
          <img
            className="rounded-lg h-[160px] w-full"
            src={hint2?.img}
            alt={hint2?.img}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b py-4 border-red-600 border-dashed">
        <p className="font-bold text-lg">Pic 3:</p>
        <div className="flex justify-between w-full gap-4 items-center">
          <div className="flex flex-col gap-2 w-full justify-between h-full">
            <div className="flex flex-col">
              <h1>URL</h1>{" "}
              <Input
                type="text"
                value={hint3?.img}
                onChange={(e) => setHint3({ ...hint3, img: e.target.value })}
                placeholder="Liên kết..."
              />
            </div>
            <div className="flex flex-col">
              <h1>Hint</h1>{" "}
              <Input
                type="text"
                value={hint3?.hint}
                onChange={(e) => setHint3({ ...hint3, hint: e.target.value })}
                placeholder="Gợi ý..."
              />
            </div>
          </div>
          <img
            className="rounded-lg h-[160px] w-full"
            src={hint3?.img}
            alt={hint3?.img}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b py-4 border-red-600 border-dashed">
        <p className="font-bold text-lg">Pic 4:</p>
        <div className="flex justify-between w-full gap-4 items-center">
          <div className="flex flex-col gap-2 w-full justify-between h-full">
            <div className="flex flex-col">
              <h1>URL</h1>{" "}
              <Input
                type="text"
                value={hint4?.img}
                onChange={(e) => setHint4({ ...hint4, img: e.target.value })}
                placeholder="Liên kết..."
              />
            </div>
            <div className="flex flex-col">
              <h1>Hint</h1>{" "}
              <Input
                type="text"
                value={hint4?.hint}
                onChange={(e) => setHint4({ ...hint4, hint: e.target.value })}
                placeholder="Gợi ý..."
              />
            </div>
          </div>
          <img
            className="rounded-lg h-[160px] w-full"
            src={hint4?.img}
            alt={hint4?.img}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b py-4 border-red-600 border-dashed">
        <p className="font-bold text-lg">Pic 5:</p>
        <div className="flex justify-between w-full gap-4 items-center">
          <div className="flex flex-col gap-2 w-full justify-between h-full">
            <div className="flex flex-col">
              <h1>URL</h1>{" "}
              <Input
                type="text"
                value={hint5?.img}
                onChange={(e) => setHint5({ ...hint5, img: e.target.value })}
                placeholder="Liên kết..."
              />
            </div>
            <div className="flex flex-col">
              <h1>Hint</h1>{" "}
              <Input
                type="text"
                value={hint5?.hint}
                onChange={(e) => setHint5({ ...hint5, hint: e.target.value })}
                placeholder="Gợi ý..."
              />
            </div>
          </div>
          <img
            className="rounded-lg h-[160px] w-full"
            src={hint5?.img}
            alt={hint5?.img}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-b py-4 border-red-600 border-dashed">
        <p className="font-bold text-lg">Pic 6:</p>
        <div className="flex justify-between w-full gap-4 items-center">
          <div className="flex flex-col gap-2 w-full justify-between h-full">
            <div className="flex flex-col">
              <h1>URL</h1>{" "}
              <Input
                type="text"
                value={hint6?.img}
                onChange={(e) => setHint6({ ...hint6, img: e.target.value })}
                placeholder="Liên kết..."
              />
            </div>
            <div className="flex flex-col">
              <h1>Hint</h1>{" "}
              <Input
                type="text"
                value={hint6?.hint}
                onChange={(e) => setHint6({ ...hint6, hint: e.target.value })}
                placeholder="Gợi ý..."
              />
            </div>
          </div>
          <img
            className="rounded-lg h-[160px] w-full"
            src={hint6?.img}
            alt={hint6?.img}
          />
        </div>
      </div>
      <Button disabled={loading} onClick={handleAdd} className="my-8">
       {loading ? "Đang thêm..." : "Thêm mới"}
      </Button>
    </div>
  );
}
