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
type Song = {
  title: string;
  artist: string;
  numStreams: number;
  credits: { producer: string; writer: string };
};

function calculatePayout(song: Song): number {
  return song.numStreams * 0.0033;
}

function printSong(song: Song): void {
  console.log(`${song.title} - ${song.artist}`);
}

//optional properties
type Nums = {
  a: number;
  b: number;
  c?: number; // <- optional
};

const myNums: Nums = { a: 2, b: 5 };

//readonly
type User = {
  readonly id: number;
  username: string;
};
const user: User = {
  id: 13994,
  username: "catgurl",
};
//user.id = 644 <- won't accept it cuz it's read-only

//Intersection types
type Cat = { numLives: number };
type Dog = { breed: string };
type CatDog = Cat & Dog & { age: number };

const christy: CatDog = { numLives: 7, breed: "Husky", age: 9 };

//**************** Objects Exercise *************************
//1.Write 'Movie' type alias
type Movie = {
  readonly title: string;
  originalTitle?: string;
  director: string;
  releaseYear: number;
  boxOffice: { budget: number; grossUS: number; grossWorldwide: number };
};

const dune: Movie = {
  title: "Dune",
  originalTitle: "Dune Part One",
  director: "Denis Villeneuve",
  releaseYear: 2021,
  boxOffice: {
    budget: 165000000,
    grossUS: 108327830,
    grossWorldwide: 400671789,
  },
};

//2.write 'getProfit' function
const getProfit = (movie: Movie): number => {
  const { grossWorldwide, budget } = movie.boxOffice;
  return grossWorldwide - budget;
};
