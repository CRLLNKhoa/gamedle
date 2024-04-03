import type { Metadata } from "next";
import "@/app/globals.css";
import Hearder from "@/app/components/header";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Space_Grotesk } from "next/font/google";
import "sweetalert2/src/sweetalert2.scss";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "../components/footer";
import { Head, Html, NextScript } from "next/document";
import Script from "next/script";

const fontSans = Space_Grotesk({
  weight: "400",
  subsets: ["vietnamese"],
  // variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Gamedle - The Guess Games",
    template: `Gamedle: %s`,
  },
  description:
    "Gamedle - The Guess Games: is a website featuring various small word guessing games with multiple themes. Coded by Luong Khoa.",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Receive messages provided in `i18n.ts`
  const messages = useMessages();
  return (
    <Html lang={locale}>
      <Head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        ></Script>
      </Head>
      <body
        className={cn(
          "flex flex-col justify-between min-h-screen",
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Hearder />
            <div className="">{children}</div>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
        <NextScript />
      </body>
    </Html>
  );
}
