import productModel from "../models/productModels.js";
import { v2 as cloudinary } from "cloudinary";

// ================= ADD PRODUCT =================
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes, bestSeller } = req.body;

    // Extract uploaded images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Prepare product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      sizes: sizes ? JSON.parse(sizes) : [],
      bestSeller: bestSeller === "true",
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= LIST PRODUCTS =================
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= REMOVE PRODUCT =================
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= GET SINGLE PRODUCT =================
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };