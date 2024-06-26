import "@/app/globals.css"
import type { Metadata } from "next";
import Nav from "./components/nav";
import 'sweetalert2/src/sweetalert2.scss'

export const metadata:Metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className=" h-screen w-full flex flex-col">
        <Nav />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </body>
    </html>
  );
}
