import React, { useState, useEffect } from 'react'
import { backendurl } from '../../../../Client/src/App'
import axios from 'axios'
import { toast } from "react-toastify"
import { currency } from '../../App'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const token = localStorage.getItem("token")

    const fetchAllOrders = async () => {
        if (!token) return null

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

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(
                backendurl + "/api/order/status",
                { orderId, status: event.target.value },
                { headers: { token } }
            )

            if (response.data.success) {
                await fetchAllOrders()
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
        <div>
            <h3 className="order-title">All Orders</h3>

            <div className="order-container">
                {orders.map((order, index) => (
                    <div className="order-card" key={index}>
                        <div className="order-details">

                            <div className="user-order-details">
                                <p className="order-customer">
                                    <span>Customer</span>
                                    {order.address.firstName} {order.address.lastName}
                                </p>

                                <p><span>Tel:</span> {order.address.phone}</p>

                                <div className="order-address">
                                    <span>Shipping Address:</span>
                                    {order.address.city} {order.address.state} {order.address.country} {order.address.zipcode}
                                </div>
                            </div>

                            <div className='order-items'>
                                {order.items?.map((item, index) => (
                                    <div className="order-item" key={index}>
                                        <p><span>Product:</span> {item.name}</p>
                                        <p><span>Qty:</span> {item.quantity}</p>
                                        <p><span>Size:</span> {item.size}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="payment-method">
                                <p><span>Items:</span> {order.items?.length}</p>
                                <p><span>Method of payment:</span> {order.paymentMethod}</p>
                                <p><span>Date: </span>{new Date(order.date).toLocaleString()}</p>
                            </div>

                            <h2 className="order-amount">{currency}{order.amount}</h2>

                            <select
                                onChange={(event) => statusHandler(event, order._id)}
                                value={order.status}
                                className='order-status'
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