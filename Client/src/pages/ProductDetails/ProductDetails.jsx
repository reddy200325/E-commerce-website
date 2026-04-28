import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/components/context/ShopContext'
import { useParams } from 'react-router-dom'
import RelatedProduct from '@/components/RelatedProduct/RelatedProduct'

const ProductDetails = () => {

  const { products, currency, addtocart } = useContext(ShopContext)
  const { productId } = useParams()

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const item = products.find((p) => p._id === productId)

    if (item) {
      setProductData(item)
      setImage(item.image?.[0] || '')
    }
  }, [productId, products])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  if (!productData) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading or No product Found
      </div>
    )
  }

  return (
    <div className="w-full">

      {/* MAIN */}
      <div className="w-full flex justify-center py-10">

        <div className="w-full max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div>

            {/* MAIN IMAGE (FIXED) */}
            <div className="w-full h-[400px] md:h-[450px] flex items-center justify-center bg-white rounded-xl">
              <img
                src={image}
                alt="main"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {productData.image?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setImage(item)}
                  className={`w-16 h-16 flex items-center justify-center rounded-lg cursor-pointer transition border 
                    ${image === item ? "border-orange-500" : "border-gray-200 hover:border-orange-400"}
                  `}
                >
                  <img
                    src={item}
                    alt="thumb"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex flex-col">

            <h1 className="text-2xl md:text-3xl font-semibold">
              {productData.name}
            </h1>

            <p className="text-orange-500 text-xl md:text-2xl font-bold mt-3">
              {currency}{productData.price}
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed text-sm md:text-base">
              {productData.description}
            </p>

            {/* SIZE */}
            <div className="mt-6">
              <p className="font-medium mb-2">Select Size</p>

              <div className="flex gap-3 flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`
                      px-4 py-2 rounded-md border text-sm transition
                      ${size === item
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* POLICY */}
            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>✔ Free Delivery</p>
              <p>✔ Secure Payment</p>
              <p>✔ Easy Returns</p>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => addtocart(productData._id, size)}
              className="
                mt-6 w-full md:w-fit
                bg-orange-500 text-white
                px-6 py-3 rounded-full
                hover:bg-orange-600
                active:scale-95
                transition
              "
            >
              Add to Cart
            </button>

          </div>

        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="w-full flex justify-center py-10 border-t">

        <div className="w-full max-w-7xl px-4 md:px-6">

          <div className="flex gap-6 border-b pb-3">
            <b className="border-b-2 border-orange-500 pb-2">Description</b>
            <p className="text-gray-500">Reviews</p>
          </div>

          <div className="py-6 text-gray-600 space-y-3 text-sm md:text-base">
            <p>{productData.description}</p>
          </div>

        </div>

      </div>

      {/* RELATED */}
      <RelatedProduct category={productData.category} />

    </div>
  )
}

export default ProductDetails