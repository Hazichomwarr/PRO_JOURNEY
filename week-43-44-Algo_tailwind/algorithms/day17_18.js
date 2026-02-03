// DAY 17

//Factorial (for .. loop)
function factorial(n) {
  let acc = 1;
  for (let i = 2; i <= n; i++) {
    //console.log(`i: ${i} x acc: ${acc} = ${acc * i}`);
    acc *= i;
  }
  return acc;
}
console.log("factorial/for-loop", factorial(3)); // 120

//Factorial-2 (while loop)
function factorial2(n) {
  //Downward loop setup
  let acc = n; //ex: n = 5
  let i = n - 1; //ex: start after 5 (4)

  while (i > 0) {
    acc = acc * i; // 5 x 4 then x 3 x 2 x 1.
    i--;
  }
  return acc;
}
console.log("factorial/while-loop", factorial2(3)); // 6
// O(n) here, bc loop repeats `n` times.

// DAY - 18

//Recursion
function factorialRecursion(n) {
  if (n === 1) return 1;
  return n * factorialRecursion(n - 1);
}
/*Recursion feels harder (for me at least) because it's deeply abstracted.
setting up the base, then setting up the downward flow, to match the upward return flow.
that's why it's harder. Then its logic is mind blowing tho
*/
console.log("factorial-recursion:", factorialRecursion(5)); //120

// A)
function sumToN(n) {
  if (n === 1) return 1;
  return n + sumToN(n - 1);
}
console.log("sumToN-recursion:", sumToN(5)); // 15

// B) handle zero
function sumToN2(n) {
  if (n === 0) return 0; // 0 works with addition stack but will mess multiplication/division result
  return n + sumToN2(n - 1);
}
console.log("sumToN-2 - Recursion:", sumToN2(5)); // 15
