import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const RelatedProduct = ({ category }) => {

    const { products = [] } = useContext(ShopContext)
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        const related = products.filter(
            (item) =>
                item.category?.toLowerCase() === category?.toLowerCase()
        )

        setRelatedProduct(related.slice(0, 4))
    }, [products, category])

    // ✅ Hide completely if no items
    if (relatedProduct.length === 0) return null

    return (
        <section className="w-full flex justify-center py-10">

            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-10">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Related Products</h1>
                    <div className="w-24 h-1 bg-black mt-2"></div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {relatedProduct.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden group"
                        >

                            {/* ✅ IMAGE (FULL VISIBLE) */}
                            <Link to={`/product/${product._id}`}>
                                <div className="w-full h-60 flex items-center justify-center bg-white">
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                                    />
                                </div>
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

            </div>

        </section>
    )
}

export default RelatedProduct