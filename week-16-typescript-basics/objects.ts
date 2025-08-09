const printName = (person: { first: string; last: string }): void => {
  console.log(`Name: ${person.first} ${person.last}`);
};

let coordinate: { x: number; y: number } = { x: 32, y: 23 };
let corrd = { x: 34, y: 45 };

function randCoordinate(): { x: number; y: number } {
  return { x: Math.random(), y: Math.random() };
}

//Type Aliasses
type Point = { x: number; y: number };

let coordinate2: Point = { x: 34, y: 23 };
function randCoordinate2(): Point {
  return { x: Math.random(), y: Math.random() };
}

//Nested objects
