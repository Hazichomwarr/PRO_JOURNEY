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
