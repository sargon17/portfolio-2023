"use client";

import { useDispatch } from "react-redux";
import { setContent } from "@/contexts/features/mouse/mouseContent";
import { setDimension } from "@/contexts/features/mouse/mouseDimension";

type MouseActivationProps = {
  children: React.ReactNode | string;
  onActive?: {
    label: string;
    width: number;
    height: number;
  };
  className?: string;
};
export default function MouseActivation(props: MouseActivationProps) {
  const dispatch = useDispatch();
  return (
    <div
      className={props.className}
      onMouseEnter={() => {
        dispatch(
          setDimension({ width: props.onActive?.width || 100, height: props.onActive?.height || 100 })
        );
        dispatch(setContent(props.onActive?.label || props.children));
      }}
      onMouseLeave={() => {
        dispatch(setDimension({ width: 10, height: 10 }));
        dispatch(setContent(""));
      }}
    >
      {props.children}
    </div>
  );
}
