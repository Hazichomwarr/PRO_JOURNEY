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
