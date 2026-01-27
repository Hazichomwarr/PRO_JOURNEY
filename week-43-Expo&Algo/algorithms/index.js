//Day 2 — Functions, Loops, and Input → Output Thinking

//SumArray
function sumArray(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
// console.log(sumArray([1, 2, 3, 4])); // 10
// console.log(sumArray([-2, 5, 7])); // 10
// console.log(sumArray([])); // 0

//ReverseString
function reverseString(st) {
  let acc = "";
  for (let i = st.length; i >= 0; i--) {
    acc += st[i];
  }
  return acc;
}
console.log(reverseString("alice")); // ecila

//countVowels
function countVowels(word) {
  let count = 0;
  const vowels = "iuoae";
  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    console.log("ch is now:", ch);
    if (vowels.toLowerCase().includes(ch)) {
      count += 1;
    }
  }
  return count;
}

console.log(countVowels("alice")); // 3
