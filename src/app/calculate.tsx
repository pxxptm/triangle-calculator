export function isTriangle(a: number, b: number, c: number): boolean {
    return a + b > c && a + c > b && b + c > a;
  }
  
export function getTriangleType(a: number, b: number, c: number): string {
    const sides: number[] = [a, b, c].sort((x, y) => x - y);
    const [x, y, z] = sides;

    const epsilon = 0.001;

    console.log(x ** 2 + y ** 2 - z ** 2)
  
    if (x ** 2 + y ** 2 === z ** 2 || Math.abs(x ** 2 + y ** 2 - z ** 2) < epsilon) {
      return "Right Triangle";
    } else if (a === b && b === c) {
      return "Equilateral Triangle";
    } else if (a === b || b === c || a === c) {
      return "Isosceles Triangle";
    } else {
      return "Scalene Triangle";
    }
  }
  