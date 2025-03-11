import { formatNumber } from "../../public/formatNumber";

export function isValidNumber(value: unknown): boolean {
    return (
      typeof value === "number" && !isNaN(value) && isFinite(value) && value > 0
    );
  }

export function Suggestion(a: number, b: number, c: number) {

  const sides = [
    { name: "side 1", value: a },
    { name: "side 2", value: b },
    { name: "side 3", value: c }
  ];

  sides.sort((x, y) => x.value - y.value);

  const [x, y, z] = sides;
  
  if (x.value + y.value <= z.value) {
    const minValue = (z.value - y.value);
    const suggestion = `the length of ${z.name} (${formatNumber(z.value)}) is too long compared to the other sides. `;
    const options = [];

    const decreaseValue = formatNumber(y.value + x.value);
    options.push(`the length of ${z.name} should be less than ${formatNumber(Number(decreaseValue))} unit${Number(decreaseValue) === 1 ? "" : "s"}.`);
    options.push(`the length of ${x.name} should be greater than ${formatNumber(minValue)} unit${Number(decreaseValue) === 1 ? "" : "s"}.`);
    
    return {
      issue: suggestion,
      options: options
    };
  }

  return {
    issue: "The sides don't form a valid triangle.",
    options: ["Ensure that the sum of any two sides is greater than the third side."]
  };
}