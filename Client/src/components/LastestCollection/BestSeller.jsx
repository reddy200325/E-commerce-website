import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller)
        setBestSeller(bestProduct.slice(0, 4))
    }, [products])

    // ✅ HIDE COMPLETELY if no items
    if (bestSeller.length === 0) return null

    return (
        <section className="px-4 md:px-10 py-6">

            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold">Best Sellers</h1>
                <div className="w-24 h-1 bg-black mt-2 mx-auto"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {bestSeller.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
                    >

                        {/* IMAGE */}
                        <Link to={`/product/${product._id}`}>
                            <img
                                src={product.image[0]}
                                alt={product.name}
                                className="w-full h-60 object-cover hover:scale-105 transition duration-300"
                            />
                        </Link>

                        {/* INFO */}
                        <div className="p-3">
                            <h3 className="text-sm font-medium truncate">
                                {product.name}
                            </h3>

                            <p className="mt-2 font-semibold text-lg">
                                ${product.price}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

        </section>
    )
}

export default BestSeller