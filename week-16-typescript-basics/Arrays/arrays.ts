//array declaration
const activeUsers: string[] = [];
activeUsers.push("abdiel");

const bools: Array<boolean> = [];

//multidimensional array
const board: string[][] = [
  ["X", "O", "X"],
  ["X", "O", "X"],
  ["X", "O", "X"],
];

//**************************** Array Exercise **********************************
//1. Create an empty array of numbers called 'ages'
const ages: Array<number> = [];
const ages2: number[] = [];

//2. Create an array variable called 'gameBoard' types to hold 2 dimensional array of srings
const gameBoard: string[][] = [];

//3.Create a 'Product type' that contains a name and a price
type Product = { name: string; price: number };

//4. write 'getTotal' that accepts an array of Product types
const getTotal = (products: Product[]): number => {
  let total: number = 0;
  products.forEach((product) => {
    const { price } = product;
    total += price;
  });
  return total;
};
