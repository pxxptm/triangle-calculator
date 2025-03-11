export const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num.toString() : String(num).slice(0, 5);
  };