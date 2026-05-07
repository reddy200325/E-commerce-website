import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestSeller === true)
        setBestSeller(bestProduct.slice(0, 4))
    }, [products])

    if (bestSeller.length === 0) return null

    return (
        <section id="best-sellers" className="px-4 md:px-10 py-6">

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
                        className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden group"
                    >

                        {/* IMAGE */}
                        <Link to={`/product/${product._id}`}>
                            <div className="w-full h-60 overflow-hidden">
                                <img
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                                />
                            </div>
                        </Link>

                        {/* INFO */}
                        <div className="p-3">
                            <h3 className="text-sm font-medium truncate">
                                {product.name}
                            </h3>

                            <p className="mt-2 font-semibold text-lg">
                                ₹{product.price}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

        </section>
    )
}

export default BestSeller