import "./styles/global.scss";
import "./globals.css";

export const metadata = {
  title: "Mykhaylo Tymofyeyev Portfolio",
  description: "Mykhaylo Tymofyeyev Portfolio",
  metadata: {
    viewport: "width=device-width, initial-scale=1",
  },
  links: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
      crossorigin: true,
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: true,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Trirong:ital,wght@0,500;0,600;1,300&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100;0,900;1,100&display=swap",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
