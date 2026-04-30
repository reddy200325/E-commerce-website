import React, { useState, useEffect } from "react";
import { backendurl, currency } from "@/App";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all orders from backend
  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(
        backendurl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendurl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders(); // refresh orders after update
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
        All Orders
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-5"
          >
            {/* Customer details */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p className="text-base font-semibold text-gray-800 mb-2">
                Customer Details
              </p>

              <p>
                <span className="font-medium text-gray-700">Name:</span>{" "}
                {order.address.firstName} {order.address.lastName}
              </p>

              <p>
                <span className="font-medium text-gray-700">Phone:</span>{" "}
                {order.address.phone}
              </p>

              <p>
                <span className="font-medium text-gray-700">Address:</span>{" "}
                {order.address.city}, {order.address.state},{" "}
                {order.address.country} - {order.address.zipcode}
              </p>
            </div>

            {/* Order items */}
            <div className="text-sm">
              <p className="font-semibold text-gray-700 mb-2">Items</p>

              <div className="flex flex-col gap-2">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="text-gray-700 font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment info */}
            <div className="text-sm bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-gray-700">
                <span>Items:</span>
                <span>{order.items?.length}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Payment:</span>
                <span>{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Date:</span>
                <span>{new Date(order.date).toLocaleString()}</span>
              </div>
            </div>

            {/* Total amount */}
            <div className="text-center">
              <p className="text-xl font-bold text-red-500">
                {currency}{order.amount}
              </p>
            </div>

            {/* Order status */}
            <select
              value={order.status}
              onChange={(event) => statusHandler(event, order._id)}
              className="w-full p-3 border rounded-lg bg-white text-gray-700 outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipping">Shipping</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;