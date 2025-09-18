import express from "express";

const app = express();

//anytime there's request, app.use runs
// app.use(() => {
//   console.log("New request just hit!");
// });

app.get("/", (req, res) => {
  res.send("Hello World");
});

//params
app.get("/r/:parm", (req, res) => {
  const { parm } = req.params;
  res.send(`<h1 style="text-align: center">This is ${parm}-Page!</h1>`);
});

//query
app.get("/search", (req, res) => {
  const { q } = req.query;
  res.send(
    `<h1 style="text-align: center">Search Result for: ${q.toUpperCase()}</h1>`
  );
});

app.get(/(.*)/, (req, res) => {
  res.send("404 - PAGE NOT FOUND!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
