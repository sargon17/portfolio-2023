const textToLetters = (text: string): string[] => {
  return text.split("");
};

const getItemCenter = (item: any): object => {
  const { top: itemTop, left: itemLeft, width: itemWidth, height: itemHeight } = item.getBoundingClientRect();

  return {
    x: itemLeft + itemWidth / 2,
    y: itemTop + itemHeight / 2,
  };
};

export { textToLetters, getItemCenter };
