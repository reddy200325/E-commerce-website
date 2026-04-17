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

    return (
        <section className="w-full flex justify-center py-10">

            {/* CONTAINER */}
            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-10">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Related Products</h1>
                    <div className="w-24 h-1 bg-black mt-2"></div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {relatedProduct.length > 0 ? (
                        relatedProduct.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden group"
                            >

                                {/* IMAGE */}
                                <div className="relative">

                                    <Link to={`/product/${product._id}`}>
                                        <img
                                            src={product.image[0]}
                                            alt={product.name}
                                            className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </Link>

                                </div>

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
                        ))
                    ) : (
                        <p className="text-gray-500">No related products found</p>
                    )}

                </div>

            </div>

        </section>
    )
}

export default RelatedProduct