let age: number | string = 23;
age = 21;
age = "24";

type Point = { x: number; y: number };
type Loc = { lat: number; long: number };

let coordinates: Point | Loc = { x: 1, y: 34 };
coordinates = { lat: 321.231, long: 23.334 };

//Type narrowing(using typeof)
function calculateTax(price: number | string, tax: number): number {
  if (typeof price === "string") {
    price = parseFloat(price.replace("$", ""));
  }
  return price * tax;
}

//uniontype with arrays
const stuff: (number | string)[] = []; //will accept an array of numbers or/and strings
const stuff2: number[] | string[] = []; //will only accept a number or string array, but not both

//Literal Types
let zero: 0 = 0;

let mood: "happy" | "sad" = "happy";

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
let today: DayOfWeek = "Wednesday";

//******************* Exercise ************************** */
//1.Create a variable called 'highScore' that can be a number OR a boolean
const highScore: number | boolean = 9;

//2.Create an array called 'things' numbers OR strings
const things: number[] | string[] = [];

//3.Create literal type called 'SkillLevel'
type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

//4.Create a type called 'SkiSchollStudent'
type SkiSchollStudent = {
  name: string;
  age: number;
  sport: "ski" | "snowboard";
  level: SkillLevel;
};

//5.Define a type to represent an RGB and HSL color
type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

//Create an array called 'colors' that holds a mixture of RGB an HSL color types
const colors: RGB[] | HSL[] = [];

//6.Write a function called 'greet' that accepts a single string OR an array of strings
//it should print 'Hello, <name>' for that single person OR greet each person in the array

const greet = (name: string | string[]): void => {
  if (typeof name === "string") console.log("Hello", name);
  else
    name.forEach((el) => {
      console.log("Hello", el);
    });
};

//Type Assertion
let mystery: unknown = "Hello World!!!!";
const numChars = (mystery as string).length; //telling typescript i know more than you
