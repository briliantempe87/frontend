import "./globals.css";
import Navbar from "@/components/Navbar";
import { roboto } from "./font";

export const metadata = {
  title: {
    default: "Situs Next.js",
    template: "%s | Situs Next.js",
  },
  description: "Kumpulan tutorial belajar Next.js dari Dasar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="bg-gray-100 flex flex-col px-4 py-4 min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="py-3 grow">{children}</main>
        <footer className="border-t py-3 text-center text-xs">
          <span>{"I'm here to stay (Footer)"}</span>
        </footer>
      </body>
    </html>
  );
}
