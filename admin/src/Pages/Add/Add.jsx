import React, { useState } from "react";
import upload_img from "@/assets/upload_img.jpg";
import axios from "axios";
import { backendurl } from "@/App";
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate preview URL for selected images
  const preview = (file) =>
    file ? URL.createObjectURL(file) : upload_img;

  // Toggle size selection
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // Handle product submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Basic validation
    if (!name || !description || !price) {
      return toast.error("Please fill all fields");
    }
    if (sizes.length === 0) {
      return toast.error("Please select at least one size");
    }
    if (!image1) {
      return toast.error("At least one image is required");
    }

    try {
      setLoading(true);

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
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col gap-6"
      >
        <h2 className="text-xl font-semibold text-gray-700">
          Add New Product
        </h2>

        {/* Image upload */}
        <div>
          <p className="mb-3 font-medium text-gray-600">Upload Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[image1, image2, image3, image4].map((img, index) => (
              <label
                key={index}
                className="relative border-2 border-dashed border-gray-300 rounded-xl h-32 flex items-center justify-center cursor-pointer hover:border-orange-400 transition bg-gray-50 overflow-hidden"
              >
                <input
                  type="file"
                  hidden
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
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 hover:text-orange-500 transition">
                    <span className="text-2xl font-light">+</span>
                    <p className="text-xs mt-1">Upload</p>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Product details */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-300"
          required
        />

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-orange-300 resize-none h-28"
          required
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border rounded-lg outline-none"
            required
          />
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-3 font-medium text-gray-600">Sizes</p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-md cursor-pointer border transition text-sm
                ${
                  sizes.includes(size)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller toggle */}
        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
          />
          Bestseller
        </label>

        {/* Submit */}
        <button  type="submit" disabled={loading}
          className={`py-3 rounded-lg font-medium text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Add;