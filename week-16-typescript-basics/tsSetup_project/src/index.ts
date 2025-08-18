console.log("Hello!!!!");
const btn = document.getElementById("btn"); // or add '!' <- Non-Null assertion Operator

//assertion with DOM
const input = document.getElementById("todo")! as HTMLInputElement;
const form = document.querySelector("form")!;
const ul = document.getElementById("todo-list");

// btn?.addEventListener("click", function (): void {
//   console.log("BUTTON CLICKED!");
//   console.log(input.value);
//   input.value = "";
// });

//Connecting to localStorage
function getTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
}
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Adding in an interface
interface Todo {
  text: string;
  completed: boolean;
}
const todos: Todo[] = getTodos();
todos.forEach(createNewTodo);

//Working with Events
function handleSubmit(e: SubmitEvent): void {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  todos.push(newTodo);
  createNewTodo(newTodo);
  input.value = "";
  console.log(todos);

  //adding in to localStorage
  saveToLocalStorage();
}

function createNewTodo(todo: Todo): void {
  const newLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  newLi.append(todo.text);
  newLi.append(checkbox);
  ul?.append(newLi);
}

// checkbox.addEventListener("change", () => {
//     todo.completed = checkbox.checked;
//     if (todo.completed) {
//       newLi.classList.add("completed");
//     } else {
//       newLi.classList.remove("completed");
//     }
//     saveToLocalStorage();
//   });

// document.addEventListener("DOMContentLoaded", () => {

// });
form.addEventListener("submit", handleSubmit);
