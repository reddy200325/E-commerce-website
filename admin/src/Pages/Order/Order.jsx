import React, { useState, useEffect } from 'react'
import { backendurl } from '../../../../Client/src/App'
import axios from 'axios'
import { toast } from "react-toastify"
import { currency } from '../../App'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const token = localStorage.getItem("token")

    // Fetch all orders
    const fetchAllOrders = async () => {
        if (!token) return

        try {
            const response = await axios.post(
                backendurl + '/api/order/list',
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setOrders(response.data.orders)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Update order status
    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(
                backendurl + "/api/order/status",
                { orderId, status: event.target.value },
                { headers: { token } }
            )

            if (response.data.success) {
                fetchAllOrders()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [token])

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-6">All Orders</h2>

            {/* Orders List */}
            <div className="flex flex-col gap-5">

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-2xl shadow p-4 md:p-6 flex flex-col gap-4"
                    >

                        {/* Top Section */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                            {/* Customer Info */}
                            <div className="text-sm text-gray-700">
                                <p className="font-semibold text-gray-900">
                                    {order.address.firstName} {order.address.lastName}
                                </p>
                                <p>{order.address.phone}</p>
                                <p className="text-gray-500 mt-1">
                                    {order.address.city}, {order.address.state},{" "}
                                    {order.address.country} - {order.address.zipcode}
                                </p>
                            </div>

                            {/* Order Meta */}
                            <div className="text-sm text-gray-600">
                                <p><span className="font-medium">Items:</span> {order.items?.length}</p>
                                <p><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
                                <p>
                                    <span className="font-medium">Date:</span>{" "}
                                    {new Date(order.date).toLocaleString()}
                                </p>
                            </div>

                        </div>

                        {/* Items */}
                        <div className="border-t pt-3 flex flex-col gap-2">
                            {order.items?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                                >
                                    <span>{item.name}</span>
                                    <span>Qty: {item.quantity}</span>
                                    <span>Size: {item.size}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

                            {/* Amount */}
                            <p className="text-lg font-semibold text-gray-800">
                                {currency}{order.amount}
                            </p>

                            {/* Status */}
                            <select
                                onChange={(event) => statusHandler(event, order._id)}
                                value={order.status}
                                className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
                            >
                                <option value='Order Placed'>Order Placed</option>
                                <option value='Packing'>Packing</option>
                                <option value='Shipping'>Shipping</option>
                                <option value='Out for Delivery'>Out for Delivery</option>
                                <option value='Delivered'>Delivered</option>
                            </select>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default Orders