//Day - 5

// 1. if an array has any even number
// Early exit here bc just needs `a` condition check
function hasEvenNumber(arr) {
  for (let item of arr) {
    if (typeof item !== "number") return false;
    if (item % 2 === 0) return true;
  }
  return false;
}

//2. Count how many even numbers exist in an array
// Accumulation here bc need the sum of `all` even numbers
function totalEvenNumbers(arr) {
  let sum = 0;
  for (let item of arr) {
    if (hasEvenNumber(item)) sum++;
  }
  return sum;
}

//Day - 6

//Given an array, return `true` if any duplicate exists
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      //for (let j = arr.length - 1; j >= 1; j--) has 5 spins more.

      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
console.log(hasDuplicate([1, 4, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

// Given an array, count how many pairs sum to 10
function tenPairSum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      let b = arr[j];
      if (a + b === 10) total++;
    }
  }

  return total;
}

//Optimization is not the first concern here bc correctness trumps it.
//correctness clears foggy logic buggy code and prepares optmization's terrain.
//it's only after correctness that one may try to seek optimization.
