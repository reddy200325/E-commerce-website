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
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-6xl px-4 md:px-6">

        {/* Cart items */}
        <div className="flex flex-col gap-4">
          {cartData.map((item, index) => {
            const productData = products.find(p => p._id === item._id);
            if (!productData) return null;

            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b py-4"
              >
                {/* Product info */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-white border rounded">
                    <img
                      src={productData.image[0]}
                      alt=""
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-base md:text-lg font-medium">
                      {productData.name}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-orange-600 font-semibold">
                        {currency}{productData.price}
                      </p>

                      <span className="px-2 py-1 text-xs md:text-sm bg-gray-100 border rounded">
                        {item.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex justify-start md:justify-center">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      !e.target.value || e.target.value == 0
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    className="w-16 h-10 border rounded text-center outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                {/* Remove item */}
                <div className="flex justify-start md:justify-end">
                  <MdDelete
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="text-2xl cursor-pointer text-red-500 hover:scale-110 transition"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkout section */}
        <div className="mt-10 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white border rounded-xl shadow-md p-6 md:p-8">
            <Checkout />
          </div>

          <div className="w-full lg:w-1/3 border rounded-lg shadow-sm p-5 bg-white h-fit">
            <CartTotal />

            <button
              type="submit"
              form="checkout-form"
              className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
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