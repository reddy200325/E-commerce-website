import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl, currency } from "../../App";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // 🔹 Fetch products
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

  // 🔹 Delete product
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
        fetchList(); // refresh list
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
    <div className="p-4">
      {/* 🔹 Title */}
      <p className="mb-3 text-xl font-bold">Product List</p>

      {/* 🔹 Table */}
      <div className="flex flex-col gap-2">

        {/* Header */}
        <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-2 border-b-2 text-base font-semibold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-2 border-b"
          >
            {/* Image */}
            <img
              src={item.image?.[0]}
              alt={item.name}
              className="w-[50px] h-auto object-cover rounded"
            />

            {/* Details */}
            <p className="text-lg">{item.name}</p>
            <p className="text-lg">{item.category}</p>
            <p className="text-lg">
              {currency}
              {item.price}
            </p>

            {/* Actions */}
            <div className="flex justify-end">
              <MdDeleteForever
                onClick={() => removeProduct(item._id)}
                className="text-[22px] cursor-pointer text-red-500 hover:scale-110 transition"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;