import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const press_start_2p = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Pac-Man",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={press_start_2p.className}>{children}</body>
    </html>
  );
}
