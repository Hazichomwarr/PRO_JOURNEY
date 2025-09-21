//index.js
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Product = require("./models/product");

const categories = ["fruit", "vegetable", "dairy", "bake goods"];

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand") //db
  .then(() => {
    console.log("Mongo Connection Open!!!");
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

// Set view engine to EJS
app.set("view engine", "ejs");

// Tell Express where to find the views folder
app.set("views", path.join(__dirname, "views"));

//middleware to get req.body
app.use(express.urlencoded({ extended: true }));

//method override middleware
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index"); // Express will look for views/index.ejs
});

//find all products
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

//create a new product
app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});
app.post("/products", async (req, res) => {
  // console.log(req.body);
  const { name, price, category } = req.body;
  const newProduct = new Product({
    name: name,
    price: price,
    category: category,
  });
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

//find one product by id
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render(`products/show`, { product });
});

//update a product
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.statusCode);
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${updatedProduct._id}`);
});

//Delete product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => console.log("Server running on port 3000"));
