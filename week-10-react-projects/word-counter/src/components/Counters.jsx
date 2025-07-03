// import { minutes, seconds } from "../App/readingTime";
export const Counters = ({ reset, wordCount, text, charCount, time }) => {
  return (
    <section className="flex flex-col items-start gap-1 font-semibold">
      <p className="word-count">
        Word Count:
        <span className="count">{wordCount}</span>
      </p>
      <p className="char-count">
        Charcter Count:
        <span className="count">{charCount}</span> (
        <em className="text-blue-400"> Without </em>spaces:{" "}
        <span className="count">{text.trim().replace(/\s+/g, "").length}</span>)
      </p>
      <p className="reading-time">
        Reading Time: ~ <span className="count">{time[0]}</span> min{" "}
        <span className="count">{time[1]}</span> sec
      </p>
      <button className=" w-full btn my-3" onClick={reset}>
        Reset
      </button>
    </section>
  );
};
