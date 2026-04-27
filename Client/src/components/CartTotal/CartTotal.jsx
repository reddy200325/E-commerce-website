import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext)

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 text-gray-800">

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 tracking-tight">
        Cart Total
      </h2>

      {/* Price Details */}
      <div className="space-y-3">

        <div className="flex justify-between text-sm md:text-base">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">
            {currency}{getCartAmount()}
          </p>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-sm md:text-base">
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium">
            {currency}{delivery_fee}
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between items-center pt-2 text-base md:text-lg font-semibold">
          <span>Total</span>
          <span className="text-green-600">
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </span>
        </div>

      </div>

    </div>
  )
}

export default CartTotal