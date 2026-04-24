import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from "../../components/context/ShopContext";
import axios from 'axios';
import { backendurl } from '../../App';

const Order = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendurl + '/api/order/userorder',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrderData(response.data.orders);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4">

      {/* Title */}
      <div className="pt-8 border-t-2">
        <h1 className="text-[30px] font-semibold">My Orders</h1>
      </div>

      {/* Orders */}
      {
        orderData.map((order, index) => (
          order.items?.map((item, i) => (
            <div
              key={index + "-" + i}
              className="p-5 mt-4 border border-gray-200 rounded-xl shadow-sm text-gray-700 flex flex-col gap-4"
            >

              {/* Item Details */}
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.image[0]}
                  className="w-16 h-16 object-cover rounded-md"
                  alt=""
                />

                <div className="flex-1">
                  <p className="font-semibold text-base">{item.name}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-base">
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    Date: <span>{new Date(order.date).toLocaleString()}</span>
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Payment: <span>{order.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <p className="text-sm font-medium">{order.status}</p>
                </div>

                <button
                  onClick={loadOrderData}
                  className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
                >
                  Track Order
                </button>
              </div>

            </div>
          ))
        ))
      }

    </div>
  );
};

export default Order;