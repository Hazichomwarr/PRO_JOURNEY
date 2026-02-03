// DAY - 12

/* 
Day-12 exercises solution: 

A) 
1.Convert prices from USD to EUR -> transforming: map 
2.Convert prices from USD to EUR -> filtering: filter 
3.Count how many times each word appears -> building something for each element: reduce 4.Stop when a negative number is found -> early exit: For loop 
5.Find the maximum number -> searching: For loop 

B) 
1.Return an array of name lengths -> map 
2.Return only even numbers -> filter 
3.Return { even: X, odd: Y } -> reduce 
4.Return true if all numbers are positive -> early exit (For loop)

*/

//DAY - 13

// What repeats?
for (let i = 0; i < n; i++) {
  console.log(i);
} //  loop repeats N times

for (let i = 0; i < n; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(i, j);
  }
} // outer loop repeats N times; inner loop repeats 3 times

for (let i = 0; i < n; i++) {
  if (arr[i] === 5) break;
} // worse-case: loop repeats N times; best-case: early exit

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    console.log(arr[i], arr[j]);
  }
} //inner loop repeats ~N times per outer loop(pairwise comparaison).

// DAY - 14

//Big-O
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) return true;
} // O(n) -> Worst case -> scans entire array → linear growth

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    console.log(i, j);
  }
} // O(n2) -> inner loop repeats ~N times per outer loop

for (let i = 0; i < n; i++) {
  console.log("hi");
}

console.log("done"); // O(n) + O(1) → O(n)
