// import { useWordChecker } from "react-word-checker";
// import { useMemo } from "react";

// const WORD_PER_MINUTE = 238; // 238 words per minute or per 60 sec

// export function useWordStats(text) {
//   const { wordExists } = useWordChecker("en");

//   const { wordCount, charCount, readingTime } = useMemo(() => {
//     const words = text.split(" ");
//     const valideWords = words.filter((word) => word !== "" && wordExists(word));
//     const wordCount = valideWords.length;
//     const charCount = text.length;
//     const minutes = (wordCount / WORD_PER_MINUTE).toFixed(2);
//     const seconds = (minutes * 60).toFixed(2);
//   }, [text, wordExists]);

//   return {
//     charCount,
//     wordCount,
//     readingTime: [minutes, seconds],
//   };
// }

// useWordStats.js
import { useWordChecker } from "react-word-checker";
import { useMemo } from "react";

const WORDS_PER_MINUTE = 238;

export function useWordStats(text) {
  const { wordExists } = useWordChecker("en");

  const { wordCount, charCount, readingTime } = useMemo(() => {
    const words = text.split(" ");
    const validWords = words.filter((word) => word !== "" && wordExists(word));

    const wordCount = validWords.length;
    const charCount = text.length;
    const minutes = (wordCount / WORDS_PER_MINUTE).toFixed(2);
    const seconds = (minutes * 60).toFixed(2);

    return {
      wordCount,
      charCount,
      readingTime: [minutes, seconds],
    };
  }, [text, wordExists]);

  return { wordCount, charCount, readingTime };
}
