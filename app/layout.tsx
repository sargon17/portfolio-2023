import Head from "next/head";
import Script from "next/script";
import "./../styles/global.scss";
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
      <head>
        <Script
          id="matomo-analytics"
          dangerouslySetInnerHTML={{
            __html: `var _paq = (window._paq = window._paq || []);
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
  var u = "//analytics.kaylo.it/";
  _paq.push(["setTrackerUrl", u + "matomo.php"]);
  _paq.push(["setSiteId", "1"]);
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = u + "matomo.js";
  s.parentNode.insertBefore(g, s);
})();`,
          }}
        />
      </head>
      <body className={clsx(body.className, accent.className)}>{children}</body>
    </html>
    // </Providers>
  );
}
