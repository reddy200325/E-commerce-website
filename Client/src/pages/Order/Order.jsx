import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "@/components/context/ShopContext";
import axios from "axios";
import { backendurl } from "@/App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const { token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendurl + "/api/order/userorder",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const steps = [
    "Order Placed",
    "Packing",
    "Shipping",
    "Out for Delivery",
    "Delivered",
  ];

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      const response = await axios.post(
        backendurl + "/api/order/cancel",
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order Cancelled");
        loadOrderData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        My Orders
      </h1>

      <div className="flex flex-col gap-4">
  {orderData.map((order, index) =>
    order.items?.map((item, i) => (
      <div
        key={index + "-" + i}
        className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between gap-4 hover:shadow-md transition"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4 flex-1">
          <img
            onClick={() => navigate(`/product/${item._id}`)}
            src={item.image[0]}
            alt=""
            className="w-16 h-16 object-contain border rounded-lg p-1 bg-gray-50 cursor-pointer hover:scale-105 transition"
          />

          <div>
            <p className="font-medium text-sm md:text-base">
              {item.name}
            </p>

            <div className="flex gap-3 text-xs text-gray-600 mt-1">
              <span>
                {currency}
                {item.price}
              </span>

              <span>Qty: {item.quantity}</span>

              <span>Size: {item.size}</span>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(order.date).toLocaleDateString()}
            </p>

            <p className="text-xs mt-1">
              Payment:{" "}
              <span className="font-medium">
                {order.paymentMethod}
              </span>
            </p>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex flex-col md:flex-row gap-2">
          {order.status === "Cancelled" ? (
            <button className="px-4 py-1.5 text-sm rounded-full bg-red-500 text-white cursor-default">
              Cancelled
            </button>
          ) : (
            <>
              <button
                onClick={() => setActiveOrder(order)}
                className="px-4 py-1.5 text-sm rounded-full bg-black text-white hover:bg-gray-800"
              >
                Track
              </button>

              {order.status !== "Delivered" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="px-4 py-1.5 text-sm rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </>
          )}
        </div>
      </div>
    ))
  )}
</div>

{/* TRACK MODAL */}
{activeOrder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
      <h2 className="text-lg font-semibold mb-4">
        Order Tracking
      </h2>

      <div className="flex flex-col gap-4">
        {steps.map((step, i) => {
          const currentIndex = steps.findIndex(
            (s) =>
              s.toLowerCase() ===
              activeOrder.status.toLowerCase()
          );

          let dotColor = "bg-gray-300";
          let textColor = "text-gray-500";

          if (i < currentIndex) {
            dotColor = "bg-green-500";
            textColor = "text-green-600 font-medium";
          } else if (i === currentIndex) {
            dotColor = "bg-black";
            textColor = "text-black font-semibold";
          }

          return (
            <div
              key={i}
              className="flex items-center gap-3"
            >
              <div
                className={`w-4 h-4 rounded-full ${dotColor}`}
              />

              <p className={`text-sm ${textColor}`}>
                {step}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setActiveOrder(null)}
        className="mt-6 w-full py-2 bg-black text-white rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
)}
</div>
);
};

export default Order;