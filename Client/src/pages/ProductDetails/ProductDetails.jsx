import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../components/context/ShopContext'
import { useParams } from 'react-router-dom'
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct'

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

  if (!productData) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Loading or No product Found
      </div>
    )
  }

  return (
    <div className="w-full">

      {/* MAIN SECTION */}
      <div className="w-full flex justify-center py-10">

        <div className="w-full max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT IMAGES */}
          <div>

            {/* MAIN IMAGE */}
            <div className="w-full">
              <img
                src={image}
                alt="main"
                className="w-full h-[450px] object-cover rounded-xl"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {productData.image?.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  onClick={() => setImage(item)}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition ${image === item ? "border-orange-500" : "border-transparent"
                    }`}
                  alt="thumb"
                />
              ))}
            </div>

          </div>

          {/* RIGHT INFO */}
          <div>

            <h1 className="text-3xl font-semibold">
              {productData.name}
            </h1>

            <p className="text-orange-500 text-2xl font-bold mt-3">
              {currency}{productData.price}
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
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
                    className={`px-4 py-2 border rounded transition ${size === item
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* POLICY */}
            <div className="mt-6 text-sm text-gray-500 space-y-1">
              <p>Free Delivery</p>
              <p>Seamless and Secure Payment</p>
              <p>Multiple payment options available</p>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={() => addtocart(productData._id, size)}
              className="mt-6 w-full md:w-auto bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

          </div>

        </div>
      </div>

      {/* DESCRIPTION + REVIEWS */}
      <div className="w-full flex justify-center py-10 border-t">

        <div className="w-full max-w-7xl px-4 md:px-6">

          <div className="flex gap-6 border-b pb-3">
            <b className="border-b-2 border-orange-500 pb-2">Description</b>
            <p className="text-gray-500">Reviews</p>
          </div>

          <div className="py-6 text-gray-600 space-y-3">
            <p>Random description</p>
            <p>Random description</p>
          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProduct category={productData.category} />

    </div>
  )
}

export default ProductDetails