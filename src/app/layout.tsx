import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarTopLeft from "./sidebar/SidebarTopLeft";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Magister 360",
  description: "Registro calificaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`} >

        <SidebarTopLeft />

        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
