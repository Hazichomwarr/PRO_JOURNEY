function square(num: number) {
  return num * num;
}

//multiple params
const doSomething = (person: string, age: number, isFunny: boolean) => {
  return person + " has " + age + isFunny;
};

//default param annotation
function greet(person: string = "stranger") {
  return `Hi there, ${person}!`;
}
