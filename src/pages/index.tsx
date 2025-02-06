import { Geist, Geist_Mono } from "next/font/google";
import Main from "./api/Compos/Main";
import Header from "./api/Compos/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  
  return (
    <>
      <div>
        <Header />
      </div>

      <div
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center min-h-screen p-8 sm:p-20 gap-16`}
      >
        <main className="flex flex-col gap-8 w-full max-w-screen-xl items-center sm:items-start">
          <Main />
        </main>
      </div>
    </>
  );
}
