// DAY - 19 & 20

function fibonacciIterative(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let prev2 = 0; // 2 steps back
  let prev1 = 1; // 1 step back

  for (let i = 2; i <= n; i++) {
    let currResult = prev2 + prev1;
    prev2 = prev1; // prev2 carries the last result
    prev1 = currResult; // prev1 carries the current result.
  }
  const finalResult = prev1; // At the end `prev1` has the final current result.
  return finalResult;
}
console.log("fibonacci Iterative:", fibonacciIterative(10)); // Output: 55

function fibonacciRecursive(n) {
  if (n < 2) {
    return n; // Base cases: F(0) = 0, F(1) = 1
  }
  // Recursive case:
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

console.log(fibonacciRecursive(10)); // Output: 55
// Note: Calling this with a large 'n' (e.g., n=50) will be very slow.

function fibonacciMemoized(n, memo = {}) {
  if (n in memo) {
    return memo[n]; // Return the cached value if it exists
  }
  if (n < 2) {
    return n; // Base cases
  }

  // Calculate and store the result in the cache before returning
  memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  return memo[n];
}

console.log(fibonacciMemoized(10)); // Output: 55
// This can efficiently handle larger 'n' compared to the naive recursive method.
