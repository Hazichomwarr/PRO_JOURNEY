// DAY - 7

// Return the smallest number in an array
function smallestNumb(arr) {
  let smallSoFar = arr[0];
  let i = 1; //we skip the first numb.

  while (i < arr.length) {
    //or should I use a for loop here (when to efficiently use which) ?
    let currentNumber = arr[i];
    if (smallSoFar > currentNumber) smallSoFar = currentNumber;
    i++;
  }

  return smallSoFar;
}

// Return the length of the longest consecutive run of the same character
function longestCharacter(str) {
  //To Do later;
}

console.log(longestCharacter("aaabbcaaa"));

// Day - 8

// Print a rectangle (width & height)
function printRectangle(w, h) {
  for (let i = 0; i < w; i++) {
    let solder = "";
    for (let j = 0; j < h; j++) {
      solder += "*";
    }
    console.log(solder);
  }
}
printRectangle(3, 4); //Result below:
//undefined (?)
//****
//****
//****

// Pair generation
function pairGeneration(arr) {
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      let b = arr[j];
      //console.log(`comparing ${a} with ${b}`);
      if (a !== b) console.log(`(${a}, ${b})`);
    }
  }
}
pairGeneration(["a", "b", "c"]);

// Print triangle symetry
function printTriangle(n) {
  for (let i = 1; i <= n; i++) console.log("*".repeat(i));

  for (let j = n - 1; j > 0; j--) console.log("*".repeat(j));
}
//printTriangle(4);
