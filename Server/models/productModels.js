import mongoose from "mongoose";

const productschema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  sizes: {
  type: [String],default: []},
  bestSeller: {type: Boolean,default: false},
  date: { type: Date, required: true },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productschema);

export default productModel;