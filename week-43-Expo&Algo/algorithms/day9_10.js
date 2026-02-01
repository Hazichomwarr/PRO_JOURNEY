// DAY - 9

// Manual `map`: Return a newArr w/ each numb squared
function squareFn(x) {
  return x * x;
}
function squareAll(arr) {
  const newArr = [];

  for (let numb of arr) {
    newArr.push(squareFn(numb));
  }

  return newArr;
}

console.log(squareAll([1, 2, 3])); // [1, 4, 9]

// Manula `Filter`: Keep only strings longer than 3 characters.
function longWords(arr) {
  const newArr = [];

  for (let word of arr) {
    if (word.length > 3) newArr.push(word);
  }

  return newArr;
}
console.log(longWords(["hi", "hello", "hey", "welcome"])); // ["hello", "welcome"]

//Explanation:

// 1. map returns the same length because its role is to transform the array's elements, not alter the array structure itself

// 2. Filter enforces a condition; elements either qualify or are discarded, so length is not guaranteed.

// 3. Map and filter are single-loop patterns because each element is processed independently, with no need for cross-element interaction.

// DAY - 10
function countNumbers(arr) {
  const result = {};

  arr.forEach((el) => {
    // too abstract -> result[el] = (result[el] || 0) + 1;

    //Below logic eases up my brain
    if (!result[el]) result[el] = 1;
    else result[el] += 1;
  });

  return result;
}
console.log(countNumbers([1, 1, 2, 3, 3, 3])); // { 1:2, 2:1, 3:3 }

function wordFrequency(sentence) {
  let r = {};

  sentence.split(" ").forEach((el) => {
    if (!r[el]) r[el] = 1;
    else r[el] += 1;
  });

  return r;
}

console.log(wordFrequency("hello hello world")); // { hello:2, world:1 }

// Explanation:
//forEach better than `map` here bc map transforms elements. forEach is just a vessel, a helper engine, to acheive something, unrelated to the array or its elements.
