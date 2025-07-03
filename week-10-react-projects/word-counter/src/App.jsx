import "./App.css";
import { useState} from "react";
import { Header } from "./components/Header";
import { TextInput } from "./components/TextInput";
import { Counters } from "./components/Counters";
import { useWordStats } from "./components/useWordStats";

function App() {
  const [text, setText] = useState("");
  const { wordCount, charCount, readingTime } = useWordStats(text);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    return;
  };

  const handleReset = () => {
    setText("");
  };
  return (
    <main className=" w-96 my-8 mx-auto p-4 flex flex-col justify-center items-center bg-gray-200">
      <Header />
      <TextInput handleChange={handleChange} text={text} />
      <Counters
        reset={handleReset}
        wordCount={wordCount}
        text={text}
        charCount={charCount}
        time={readingTime}
      />
    </main>
  );
}

export default App;
