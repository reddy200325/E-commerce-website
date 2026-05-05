import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '@/components/context/ShopContext';
import { MdDelete } from "react-icons/md";
import CartTotal from '@/components/CartTotal/CartTotal';
import Checkout from '@/pages/Checkout/Checkout';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!cartItems || products.length === 0) return;

    const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
      Object.entries(sizes || {})
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          _id: itemId,
          size,
          quantity
        }))
    );

    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 flex justify-center">
      <div className="w-full max-w-5xl px-3">

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {/* Cart Items */}
        <div className="flex flex-col gap-3">
          {cartData.map((item, index) => {
            const productData = products.find(p => p._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm px-3 py-2 flex items-center justify-between gap-3 hover:shadow-md transition"
              >

                {/* LEFT */}
                <div className="flex items-center gap-3 flex-1 min-w-0">

                  {/* Image */}
                  <img
                    src={productData.image[0]}
                    alt=""
                    className="w-14 h-14 object-contain rounded-md border bg-gray-50 p-1"
                  />

                  {/* Info */}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {productData.name}
                    </p>

                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className="text-orange-500 font-semibold">
                        {currency}{productData.price}
                      </span>

                      <span className="px-1.5 py-0.5 bg-gray-100 border rounded">
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">

                  {/* Quantity */}
                  <div className="flex items-center bg-gray-100 rounded-full px-1">

                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item._id, item.size, item.quantity - 1);
                        }
                      }}
                      className={`w-7 h-7 flex items-center justify-center text-sm rounded-full 
                        ${item.quantity === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-200"}
                        `}
                    >
                      -
                    </button>

                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      className="w-7 h-7 flex items-center justify-center text-sm rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200"
                  >
                    <MdDelete className="text-red-500 text-lg" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Checkout */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-5">
            <Checkout />
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-md p-5 h-fit">
            <CartTotal />

            <button
              type="submit"
              form="checkout-form"
              className="w-full mt-5 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              PLACE ORDER
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;