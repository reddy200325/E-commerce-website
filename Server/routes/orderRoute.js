import express from  'express'
import { allOrder, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrder, verifyStripe } from '../controllers/orderControllers.js'
import { authUser } from '../middleware/auth.js'
import { adminAuth }from '../middleware/adminAuth.js'

export const orderRouter = express.Router()
//admin features
orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatus)
//payment features
orderRouter.post('/place',adminAuth,placeOrder)
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
//user features
orderRouter.post('/userorder',authUser,userOrder)

orderRouter.post('/verifyStripe',authUser,verifyStripe)