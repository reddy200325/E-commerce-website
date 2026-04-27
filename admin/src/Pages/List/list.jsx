import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl, currency } from "@/App";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch products
  const fetchList = async () => {
    try {
      const response = await fetch(`${backendurl}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setList(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    }
  };

  // Delete product
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendurl}/api/product/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  return (
    <div className="p-4 md:p-6">

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-5">Product List</h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        
        {/* Header */}
        <div className="grid grid-cols-[80px_2fr_1fr_1fr_100px] bg-gray-100 p-3 text-sm font-semibold text-gray-600">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-right">Action</span>
        </div>

        {/* Rows */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[80px_2fr_1fr_1fr_100px] items-center p-3 border-t hover:bg-gray-50 transition"
          >
            <img
              src={item.image?.[0]}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-lg"
            />

            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-700">
              {currency}{item.price}
            </p>

            <div className="flex justify-end">
              <MdDeleteForever
                onClick={() => removeProduct(item._id)}
                className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {list.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-4 flex gap-4 items-center"
          >
            <img
              src={item.image?.[0]}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm text-gray-700 mt-1">
                {currency}{item.price}
              </p>
            </div>

            <MdDeleteForever
              onClick={() => removeProduct(item._id)}
              className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition"
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default List;