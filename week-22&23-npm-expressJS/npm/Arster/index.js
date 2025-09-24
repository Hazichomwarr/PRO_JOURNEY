import figlet from "figlet";
import colors from "colors";

async function doStuff() {
  const text = await figlet.text("HAZ - WOLF");
  console.log(text.rainbow); //rainbow from colors package
}

doStuff();
