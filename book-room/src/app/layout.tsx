import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { link } from "fs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book a Room",
  description: "Omnia Book a Room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
