import "./styles/global.scss";
import "./globals.css";
import clsx from "clsx";

import Providers from "./Providers";

import { Trirong } from "next/font/google";
import { Libre_Franklin } from "next/font/google";

const accent = Trirong({
  subsets: ["latin-ext"],
  variable: "--font-accent",
  weight: ["200", "300", "400", "500", "600"],
});

const body = Libre_Franklin({
  subsets: ["latin-ext"],
  variable: "--font-body",
  weight: ["100", "200", "300", "400", "900"],
});

export const metadata = {
  title: "Mykhaylo Tymofyeyev Portfolio",
  description: "Mykhaylo Tymofyeyev Portfolio",
  metadata: {
    viewport: "width=device-width, initial-scale=1",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <Providers>
    <html lang="en">
      <body className={clsx(body.className, accent.className)}>{children}</body>
    </html>
    // </Providers>
  );
}
