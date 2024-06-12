"use client";
import { Provider } from "react-redux";
import { mouseStore } from "@/contexts/mouseStore";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "@studio-freight/react-lenis";
import MouseHelper from "@/components/MouseHelper";

type Props = {
  children: React.ReactNode;
};
export default function Providers(props: Props) {
  return (
    <>
      <ThemeProvider>
        <Provider store={mouseStore}>
          <ReactLenis
            root
            options={{
              smoothWheel: true,
              duration: 1.1,
              wheelMultiplier: 1.4,
            }}
          >
            {props.children}
            <MouseHelper />
          </ReactLenis>
        </Provider>
      </ThemeProvider>
    </>
  );
}
