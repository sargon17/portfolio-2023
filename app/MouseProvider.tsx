"use client";
import { useDispatch } from "react-redux";
import { setPosition } from "@/contexts/features/mouse/mousePosition";

// used to provide the mouse position to the app

type AppProps = {
  children: React.ReactNode | React.ReactNode[];
};
export default function MouseProvider(props: AppProps) {
  const dispatch = useDispatch();

  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    dispatch(setPosition({ x: clientX, y: clientY }));
  };

  return (
    <div>
      <main
        className="main"
        onMouseMove={(e) => handleMouseMove(e)}
      >
        {props.children}
      </main>
    </div>
  );
}
