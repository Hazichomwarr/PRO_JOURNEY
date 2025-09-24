//models/product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price should be positif"],
  },
  category: {
    type: String,
    enum: ["fruit", "vegetable", "dairy", "bake-goods"],
  },
});

//compile model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
