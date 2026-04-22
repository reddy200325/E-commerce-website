import React, { useState } from "react";
import upload_img from "../../assets/upload_img.jpg";
import axios from "axios";
import { backendurl } from "../../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // ✅ Image states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // ✅ Other states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // ✅ Preview helper
  const preview = (file) =>
    file ? URL.createObjectURL(file) : upload_img;

  // ✅ Size toggle
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  // ✅ Submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendurl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // 🔄 Reset form
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
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-5 p-5 w-full max-w-2xl"
    >
      {/* 🔹 Images */}
      <div>
        <p className="mb-2 font-semibold">Upload Images</p>
        <div className="flex gap-3 flex-wrap">
          {[image1, image2, image3, image4].map((img, index) => (
            <label key={index} className="cursor-pointer">
              <img
                src={preview(img)}
                alt="preview"
                className="w-24 h-24 object-cover border rounded-lg hover:opacity-80"
              />
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
            </label>
          ))}
        </div>
      </div>

      {/* 🔹 Name */}
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded-md"
        required
      />

      {/* 🔹 Description */}
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded-md"
        required
      />

      {/* 🔹 Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>

      {/* 🔹 Price */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-32 p-2 border rounded-md"
        required
      />

      {/* 🔹 Sizes */}
      <div>
        <p className="mb-2 font-semibold">Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 border rounded cursor-pointer ${
                sizes.includes(size)
                  ? "bg-orange-500 text-white"
                  : "border-gray-300"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestSeller}
          onChange={() => setBestSeller(!bestSeller)}
        />
        <label>Bestseller</label>
      </div>

      {/* 🔹 Submit */}
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;