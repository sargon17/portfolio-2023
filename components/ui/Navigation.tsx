"use client";
import Button from "./Button";
import { useLenis } from "@studio-freight/react-lenis";

type NavigationProps = {
  navigation: {
    name: string;
    label: string;
    link: string;
  }[];
};
export default function Navigation(props: NavigationProps) {
  const lenis = useLenis();

  const handleScrollToElement = (element: string) => {
    lenis?.scrollTo(element);
  };

  return (
    <>
      {props.navigation.map((item) => {
        return (
          <Button
            key={item.link}
            className="sidebar__nav__button"
            onClick={() => {
              handleScrollToElement(item.link);
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </>
  );
}
