function square(num) {
  return num * num;
}
//multiple params
var doSomething = function (person, age, isFunny) {
  return person + " has " + age + isFunny;
};
//default param annotation
function greet(person) {
  if (person === void 0) {
    person = "stranger";
  }
  return "Hi there, ".concat(person, "!");
}
//void if no return and ty[e]
function addition(num) {
  num + num;
}
addition(2);
//Union types -> typescript can infer the return types(s)
function rando(num) {
  if (Math.random() < 0.5) return num.toString();
  return num;
}
//Void type -> function that returns anything
function printTwice(msg) {
  console.log(msg);
  console.log(msg);
  //return "hi"; <- will yell at you bc fx not supposed to return something
}
//Never type: A function that doesn't finish running or a fx that throws an exception
var neverStop = function () {
  while (true) {
    console.log("I'm still going!");
  }
};
var giveError = function (msg) {
  throw new Error(msg);
};
//Functions Exercise
function twoFer(name) {
  if (name === void 0) {
    name = "you";
  }
  return "One for ".concat(name, ", one for me");
}
console.log(twoFer());
console.log(twoFer("Issa"));
var isLeapYear = function (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
console.log(isLeapYear(2013));
console.log(isLeapYear(2024));
console.log(isLeapYear(2000));
console.log(isLeapYear(1900));
