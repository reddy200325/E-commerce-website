import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const HomeCollection = () => {
    const { products } = useContext(ShopContext)
    const [homeProduct, setHomeProduct] = useState([])

    useEffect(() => {
        if (products?.length > 0) {
            setHomeProduct(products.slice(0, 8))
        }
    }, [products])

    return (
        <section className="px-4 md:px-10 py-6">

            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Home Collection
                </h1>
                <div className="w-24 h-1 bg-black mt-2 mx-auto rounded-full"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {homeProduct.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group"
                    >

                        {/* Image */}
                        <Link to={`/product/${product._id}`}>
                            <div className="w-full h-60 overflow-hidden">
                                <img
                                    src={product?.image?.[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                                />
                            </div>
                        </Link>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="text-sm font-medium text-gray-700 truncate">
                                {product.name}
                            </h3>

                            <p className="mt-2 font-semibold text-lg text-black">
                                ₹{product.price}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

        </section>
    )
}

export default HomeCollection