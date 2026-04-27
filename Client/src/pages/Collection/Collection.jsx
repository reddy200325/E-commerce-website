import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../../components/context/ShopContext'
import men_wear from '../../assets/men-wear.png'
import women_wear from '../../assets/women-banner.png'
import kid_wear from '../../assets/kid-banner.png'

const Collection = () => {

  const { products, searchTerm } = useContext(ShopContext)
  const { category } = useParams()

  const filteredProduct = products.filter((product) =>
    product.category.toLowerCase() === category.toLowerCase() &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const bannerImage = {
    Men: men_wear,
    Women: women_wear,
    Kids: kid_wear,
  }

  return (
    <section className="w-full">

      {/* HERO BANNER */}
      <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">

        {bannerImage[category] ? (
          <img
            src={bannerImage[category]}
            alt="category banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p>No image available</p>
          </div>
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">

          <h1 className="text-3xl md:text-6xl font-extrabold tracking-wide">
            {category} Collection
          </h1>

          <p className="text-sm md:text-lg mt-3 text-gray-200">
            Explore the latest trends
          </p>

        </div>

      </div>

      {/* CONTENT */}
      <div className="w-full flex justify-center py-10">

        <div className="w-full max-w-7xl px-4 md:px-6">

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {category} Products
            </h1>
            <div className="w-24 h-1 bg-black mt-2"></div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProduct.length > 0 ? (
              filteredProduct.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
                >

                  <Link to={`/product/${product._id}`}>
                    
                    {/* ✅ IMAGE FIX (FULL VISIBLE, NO CROP) */}
                    <div className="w-full h-60 flex items-center justify-center bg-white">
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition duration-300"
                      />
                    </div>

                  </Link>

                  <div className="p-3">

                    <h3 className="text-sm font-medium truncate">
                      {product.name}
                    </h3>

                    <p className="mt-2 font-semibold text-lg">
                      ${product.price}
                    </p>

                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <h2 className="text-xl font-semibold">
                  No products found 😕
                </h2>
                <p className="text-gray-500 mt-2">
                  Try searching something else
                </p>
              </div>
            )}

          </div>

        </div>
      </div>

    </section>
  )
}

export default Collection