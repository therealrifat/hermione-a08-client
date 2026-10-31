import type { Metadata } from "next";
import { Geist} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "BondHub",
  description: "Social Development Events Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
