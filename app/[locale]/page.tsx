import { useTranslations } from "next-intl";
import { TbSquareRoundedLetterG } from "react-icons/tb";
import CardGame from "../components/card-game";

export default function Index() {
  const trans = useTranslations("home");
  return (
    <main className="flex flex-col container flex-1 max-w-lg lg:max-w-3xl">
      <div className="flex items-center justify-center p-8 select-none">
        <TbSquareRoundedLetterG className="w-12 h-12" />
        <h1 className="text-3xl">amedle</h1>
      </div>
      <p className="text-center">{trans("sub")}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
        <CardGame title="Day Bygones" textColor="text-sky-400" mode={5} ques={45} href="/dbg" img="/imgs/card/Dino.png"/>
        <CardGame title="Guess The Game" mode={5} ques={45} href="/guess-the-game" img="/imgs/card/74.png"/>
      </div>
    </main>
  );
}
