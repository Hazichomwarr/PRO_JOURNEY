import "./App.css";
// import { Accordion } from "./components/Accordion";
import { Accordion2 } from "./components/Accordion2";

const items = [
  { title: "What is React?", content: "React is a UI library." },
  { title: "Why use React?", content: "It's flexible and component-based." },
  { title: "How do you use React?", content: "By creating components." },
  {
    title: "What is JSX?",
    content: "A syntax extension that lets you write HTML in JS.",
  },
];

function App() {
  return (
    <div className="p-6">
      <Accordion2 items={items} />
    </div>
  );
}

export default App;
