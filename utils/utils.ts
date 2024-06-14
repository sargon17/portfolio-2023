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

const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  // const distanceY = Math.abs(e.clientY - centerY);
  // const distanceX = Math.abs(e.clientX - centerX);
  // let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

  return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
};

export { textToLetters, getItemCenter, handleScrollToElement, getDistance };
