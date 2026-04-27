import React, { useState } from "react";
import upload_img from "../../assets/upload_img.jpg";
import axios from "axios";
import { backendurl } from "../../App";
import { toast } from "react-toastify";

const Add = () => {

  // Image states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Preview helper
  const preview = (file) =>
    file ? URL.createObjectURL(file) : upload_img;

  // Toggle sizes
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("bestSeller", bestSeller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        backendurl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSizes([]);
        setBestSeller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center">

      {/* Main Container */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6"
      >

        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Product
        </h2>

        {/* Image Upload */}
        <div>
          <p className="font-medium mb-3">Upload Images</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[image1, image2, image3, image4].map((img, index) => (
              <div
                key={index}
                className="relative border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-28 cursor-pointer hover:border-orange-400 transition group"
              >
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (index === 0) setImage1(file);
                    if (index === 1) setImage2(file);
                    if (index === 2) setImage3(file);
                    if (index === 3) setImage4(file);
                  }}
                />

                {img ? (
                  <img
                    src={preview(img)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 text-sm">
                    <span className="text-2xl">+</span>
                    <p>Upload</p>
                  </div>
                )}

                {/* Hover overlay */}
                {img && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs rounded-xl transition">
                    Change
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Name & Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none min-h-[100px]"
          required
        />

        {/* Category & Bestseller */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none w-full md:w-60"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={bestSeller}
              onChange={() => setBestSeller(!bestSeller)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Bestseller</label>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="font-medium mb-2">Select Sizes</p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg border cursor-pointer text-sm transition
                  ${
                    sizes.includes(size)
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-48 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 active:scale-95 transition"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default Add;