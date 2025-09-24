const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/movieApp") //db
  .then(() => {
    console.log("Connection Open!!!");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

//1. make a Schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

//2. Make a model (class) -> collection(table)
const Movie = mongoose.model("Movie", movieSchema);

//3.Create a movie instance ->
const movie = new Movie({
  title: "Amadeus",
  year: 1986,
  score: 9.2,
  rating: "R",
});
movie.save();
