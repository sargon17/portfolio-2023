import "./../styles/global.scss";
import "./globals.css";
import clsx from "clsx";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { Trirong } from "next/font/google";
import { Libre_Franklin } from "next/font/google";

import AnimatedBackground from "@/components/ui/AnimatedBackground";

import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/ui/Navigation";
import MainContainer from "@/components/MainContainer";
import ThemeSwitcher from "@/components/ui/theme/ThemeSwitcher";
import MouseActivation from "@/components/ui/mouse/MouseActivation";

import Providers from "./Providers";
import MouseProvider from "./MouseProvider";

const accent = Trirong({
  subsets: ["latin-ext"],
  variable: "--font-accent",
  weight: ["200", "300", "400", "500", "600"],
});

const body = Libre_Franklin({
  subsets: ["latin-ext"],
  variable: "--font-body",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Mykhaylo Tymofyeyev Portfolio",
  description: "Mykhaylo Tymofyeyev Portfolio",
  metadata: {
    viewport: "width=device-width, initial-scale=1",
  },
};

const navigation = [
  {
    name: "main",
    label: "main",
    link: "#_main",
  },
  {
    name: "projects",
    label: "projects",
    link: "#_projects",
  },
  {
    name: "contacts",
    label: "contacts",
    link: "#_contacts",
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <body className={clsx(body.className, accent.className)}>
        <Providers>
          <MouseProvider>
            <AnimatedBackground />
            <Sidebar
              bottom={
                <MouseActivation
                  onActive={{
                    label: "call me kaylo",
                    width: 100,
                    height: 100,
                  }}
                  className="sidebar__title__name"
                >
                  Mykhaylo Tymofyeyev
                </MouseActivation>
              }
            >
              <Navigation navigation={navigation} />
              <ThemeSwitcher />
            </Sidebar>
            <MainContainer>{children}</MainContainer>
          </MouseProvider>
        </Providers>
      </body>
    </html>
  );
}
