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
    <div className="max-w-6xl mx-auto px-4">

      <div className="py-6">
        <h1 className="text-2xl md:text-3xl font-semibold">
          My Orders
        </h1>
      </div>

      <div className="flex flex-col gap-4">

        {orderData.map((order, index) => (
          order.items?.map((item, i) => (

            <div
              key={index + "-" + i}
              className="
                flex items-center justify-between gap-4 px-4 py-3
                bg-white rounded-xl
                transition-all duration-300
                hover:bg-orange-50
                hover:shadow-lg
                hover:-translate-y-[2px]
                active:scale-[0.99]
              "
            >

              {/* LEFT */}
              <div className="flex items-center gap-4 flex-1">

                <img
                  src={item.image[0]}
                  alt=""
                  className="w-16 h-16 object-contain"
                />

                <div className="flex flex-col gap-1">

                  <p className="font-medium text-sm md:text-base">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-600">
                    <span>{currency}{item.price}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Size: {item.size}</span>
                  </div>

                  <p className="text-xs text-gray-400">
                    {new Date(order.date).toLocaleDateString()}
                  </p>

                </div>
              </div>

              {/* STATUS */}
              <div className="hidden sm:flex items-center gap-2 min-w-[120px] justify-center">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm font-medium">
                  {order.status}
                </p>
              </div>

              {/* BUTTON */}
              <button
                onClick={loadOrderData}
                className="
                  px-5 py-2 text-sm font-medium rounded-full
                  bg-orange-500 text-white
                  transition-all duration-200
                  hover:bg-600
                  hover:shadow-md
                  active:scale-95
                "
              >
                Track Order
              </button>

            </div>

          ))
        ))}

      </div>

    </div>
  );
};

export default Order;