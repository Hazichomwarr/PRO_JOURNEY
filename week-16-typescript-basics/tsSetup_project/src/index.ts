console.log("Hello!!!!");

const btn = document.getElementById("btn"); // or add '!' <- Non-Null assertion Operator

//assertion with DOM
const input = document.getElementById("todo")! as HTMLInputElement;

btn?.addEventListener("click", function (): void {
  console.log("BUTTON CLICKED!");
  console.log(input.value);
  input.value = "";
});
