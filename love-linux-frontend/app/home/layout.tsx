import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3Modal } from '../../context/web3modal'

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Love, Linux",
  description: "Date linux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>
        {children}
        </Web3Modal>
      </body>
    </html>
  );
}
