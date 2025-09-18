import { franc } from "franc";
import langs from "langs";
import colors from "colors";

const input = process.argv[2];

function findLang(text) {
  const minLength = { minLength: 5 };
  const code = franc(text, minLength);

  if (code === "und") {
    console.log("sorry Couldn't find a match!");
  } else {
    const lang = langs.where("3", code);
    if (lang) console.log("Best guess ->", lang.name.rainbow);
    else console.log(`Detected code: "${code.toUpperCase()}", No name found`);
  }
}
findLang(input);
