import express from 'express';
import { addToCart, updateCart, getUserCart,clearCart } from '../controllers/cartControllers.js';
import { authUser } from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authUser, addToCart);
cartRouter.post('/update', authUser, updateCart);
cartRouter.post('/get', authUser, getUserCart);
cartRouter.post("/clear", authUser, clearCart);

export default cartRouter;