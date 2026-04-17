import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext)

  return (
    <div className="w-full text-[#333]">
      <div>
        <h2 className="text-[26px] mb-4">Cart Total</h2>
      </div>

      <div>
        <div className="flex justify-between my-2">
          <p className="text-base">Subtotal</p>
          <p>{currency}{getCartAmount()}</p>
        </div>

        <hr className="border-t border-[#ddd] my-2" />

        <div className="flex justify-between my-2">
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}</p>
        </div>

        <div className="flex justify-between mt-4 font-bold">
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal