import { type } from "os";

const textToLetters = (text: string): string[] => {
  return text.split("");
};

type getItemCenterReturnType = {
  x: number;
  y: number;
};

const getItemCenter = (item: any): getItemCenterReturnType => {
  const { top: itemTop, left: itemLeft, width: itemWidth, height: itemHeight } = item.getBoundingClientRect();

  return {
    x: itemLeft + itemWidth / 2,
    y: itemTop + itemHeight / 2,
  };
};

const handleScrollToElement = (element: string) => {
  const el = document.querySelector(element);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export { textToLetters, getItemCenter, handleScrollToElement };
